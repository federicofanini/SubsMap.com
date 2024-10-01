import Calendar from "@/components/sub/Calendar";
import { InsertSubForm } from "@/components/sub/InsertSub";
import SubTable from "@/components/sub/SubTable";

export default function DashboardPage() {
  return (
    <>
      <Calendar />
      <InsertSubForm />
      <SubTable />
    </>
  )
}
