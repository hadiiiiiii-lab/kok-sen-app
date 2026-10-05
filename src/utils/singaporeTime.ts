/**
 * Singapore Time (SGT / UTC+8) utility functions.
 * Ensures consistent date and time calculations regardless of user's device/browser timezone.
 */

export const SGT_TIMEZONE = 'Asia/Singapore';

/**
 * Returns date parts in Singapore Timezone (year, month, day, hour, minute, second, dayOfWeek)
 */
export function getSingaporeDateParts(date: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-SG', {
    timeZone: SGT_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    weekday: 'short',
  });

  const parts = formatter.formatToParts(date);
  const findVal = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value || '';

  return {
    year: parseInt(findVal('year'), 10),
    month: parseInt(findVal('month'), 10), // 1-12
    day: parseInt(findVal('day'), 10),
    hour: parseInt(findVal('hour'), 10), // 0-23
    minute: parseInt(findVal('minute'), 10),
    second: parseInt(findVal('second'), 10),
    weekday: findVal('weekday'),
  };
}

/**
 * Returns today's Singapore date in YYYY-MM-DD format (ideal for HTML date inputs)
 */
export function getSingaporeTodayDateISO(): string {
  const { year, month, day } = getSingaporeDateParts(new Date());
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

/**
 * Formats a Date/timestamp into Singapore 12-hour or 24-hour time string (e.g. "7:45 PM SGT" or "19:45 SGT")
 */
export function formatSingaporeTime(
  dateInput: Date | string | number = new Date(),
  includeZone = true
): string {
  try {
    const d = new Date(dateInput);
    const timeStr = d.toLocaleTimeString('en-SG', {
      timeZone: SGT_TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return includeZone ? `${timeStr} SGT` : timeStr;
  } catch {
    return 'SGT';
  }
}

/**
 * Formats a Date/timestamp into a full Singapore Date string (e.g. "22 Sep 2026")
 */
export function formatSingaporeDate(
  dateInput: Date | string | number = new Date()
): string {
  try {
    const d = new Date(dateInput);
    return d.toLocaleDateString('en-SG', {
      timeZone: SGT_TIMEZONE,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/**
 * Formats order history timestamps relative to Singapore calendar day (e.g. "Today, 7:45 PM SGT" or "Yesterday, 1:30 PM SGT")
 */
export function formatOrderTimestampSGT(dateInput: Date | string | number): string {
  try {
    const orderDate = new Date(dateInput);
    const now = new Date();

    const orderParts = getSingaporeDateParts(orderDate);
    const nowParts = getSingaporeDateParts(now);

    const isToday =
      orderParts.year === nowParts.year &&
      orderParts.month === nowParts.month &&
      orderParts.day === nowParts.day;

    // Check yesterday in SGT
    const orderDayStamp = new Date(Date.UTC(orderParts.year, orderParts.month - 1, orderParts.day)).getTime();
    const nowDayStamp = new Date(Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day)).getTime();
    const diffDays = Math.round((nowDayStamp - orderDayStamp) / (1000 * 60 * 60 * 24));

    const timeStr = orderDate.toLocaleTimeString('en-SG', {
      timeZone: SGT_TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    if (isToday) {
      const diffMins = Math.max(0, Math.round((now.getTime() - orderDate.getTime()) / (1000 * 60)));
      if (diffMins < 2) return `Just placed (${timeStr} SGT)`;
      if (diffMins < 60) return `Today, ${timeStr} SGT (${diffMins}m ago)`;
      return `Today, ${timeStr} SGT`;
    }

    if (diffDays === 1) {
      return `Yesterday, ${timeStr} SGT`;
    }

    const dateFormatted = orderDate.toLocaleDateString('en-SG', {
      timeZone: SGT_TIMEZONE,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return `${dateFormatted}, ${timeStr} SGT`;
  } catch {
    return 'Past Order (SGT)';
  }
}

export interface SingaporeRestaurantStatus {
  isOpen: boolean;
  statusText: string;
  subText: string;
  badgeText: string;
  currentTimeSGT: string;
  currentDateSGT: string;
  session: 'lunch' | 'dinner' | 'prep_break' | 'closed';
}

/**
 * Calculates current operating status of Kok Sen Restaurant according to Singapore Time:
 * Lunch: 11:30 AM - 3:00 PM SGT
 * Dinner: 5:30 PM - 10:30 PM SGT
 */
export function getSingaporeRestaurantStatus(): SingaporeRestaurantStatus {
  const now = new Date();
  const { hour, minute, weekday } = getSingaporeDateParts(now);
  const currentMinutes = hour * 60 + minute;

  const lunchStart = 11 * 60 + 30; // 11:30 AM = 690 mins
  const lunchEnd = 15 * 60;        // 3:00 PM = 900 mins
  const dinnerStart = 17 * 60 + 30;// 5:30 PM = 1050 mins
  const dinnerEnd = 22 * 60 + 30;  // 10:30 PM = 1350 mins

  const currentTimeSGT = formatSingaporeTime(now, true);
  const currentDateSGT = formatSingaporeDate(now);

  // Kok Sen Restaurant is closed on Mondays
  if (weekday === 'Mon') {
    return {
      isOpen: false,
      statusText: 'Closed on Mondays',
      subText: 'Weekly rest day • Reopens Tuesday 11:30 AM SGT',
      badgeText: 'Reopens Tue 11:30 AM',
      currentTimeSGT,
      currentDateSGT,
      session: 'closed',
    };
  }

  // Morning before lunch service starts
  if (currentMinutes < lunchStart) {
    return {
      isOpen: false,
      statusText: 'Opens for Lunch Today',
      subText: 'Lunch service starts today at 11:30 AM SGT',
      badgeText: 'Opens 11:30 AM Today',
      currentTimeSGT,
      currentDateSGT,
      session: 'closed',
    };
  }

  // Lunch service
  if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
    return {
      isOpen: true,
      statusText: 'Open Now • Lunch Seating',
      subText: 'Kitchen closes at 3:00 PM SGT',
      badgeText: 'Lunch Service Active',
      currentTimeSGT,
      currentDateSGT,
      session: 'lunch',
    };
  }

  // Midday break between lunch and dinner
  if (currentMinutes >= lunchEnd && currentMinutes < dinnerStart) {
    return {
      isOpen: false,
      statusText: 'Midday Kitchen Prep Break',
      subText: 'Dinner service starts at 5:30 PM SGT',
      badgeText: 'Reopens 5:30 PM SGT',
      currentTimeSGT,
      currentDateSGT,
      session: 'prep_break',
    };
  }

  // Dinner service
  if (currentMinutes >= dinnerStart && currentMinutes < dinnerEnd) {
    return {
      isOpen: true,
      statusText: 'Open Now • Dinner Seating',
      subText: 'Kitchen closes at 10:30 PM SGT',
      badgeText: 'Dinner Service Active',
      currentTimeSGT,
      currentDateSGT,
      session: 'dinner',
    };
  }

  // After dinner service has closed for the night
  const isTomorrowMonday = weekday === 'Sun';
  return {
    isOpen: false,
    statusText: 'Closed for the Night',
    subText: isTomorrowMonday
      ? 'Closed Mondays • Reopens Tuesday 11:30 AM SGT'
      : 'Lunch service starts tomorrow at 11:30 AM SGT',
    badgeText: isTomorrowMonday ? 'Reopens Tue 11:30 AM' : 'Opens 11:30 AM SGT',
    currentTimeSGT,
    currentDateSGT,
    session: 'closed',
  };
}
