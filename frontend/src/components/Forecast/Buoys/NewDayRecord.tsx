export default function NewDayRecord({ modifiedDate }: { modifiedDate: Date }) {
  return (
    <>
      <tr className='newDay'>
        <th colSpan={6}>{modifiedDate.toLocaleDateString('es-ES')}</th>
      </tr>
    </>
  )
}
