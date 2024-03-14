export default function DaySelector({
  children,
  setSelectedDay,
}: {
  children: React.ReactNode
  setSelectedDay: (day: number) => void
}) {
  return (
    <div className="day-selector">
      <h1>{children}</h1>
      <p>Select a day</p>
      <select
        name="day"
        id="day"
        onChange={(e) => setSelectedDay(Number(e.target.value))}
      >
        <option value="6">Select a day</option>
        <option value="12">Select a day</option>
        <option value="24">Select a day</option>
      </select>
    </div>
  )
}
