import { CardGridSkeleton, PageHeaderSkeleton } from "@/components/layout/page-skeletons";

export default function DashboardLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <CardGridSkeleton count={3} />
    </>
  );
}
