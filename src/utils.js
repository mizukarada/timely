import { DateTime } from 'luxon'

/**
 * Get the sum of a task's tracked time periods 
 * @param {Object} task An individual task
 * @returns {Duration} Sum total of the task's logged time periods
 */
export function calcElapsedDuration(task) {
  const fromMillis = (e) => DateTime.fromMillis(e)
  const durationOf = (start, end) => fromMillis(end).diff(fromMillis(start), ['hours', 'minutes', 'seconds'])
  const durations = task.periods.map((period) => durationOf(period.start, period.end).normalize())
  if (!durations || !durations.length) return
  let d = durations.reduce((prev, current) => prev.plus(current).normalize())
  return d
}