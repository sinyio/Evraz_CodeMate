import { PageLayout } from "@app/layouts/PageLayout";
import { FC } from "react";
import s from "./History.module.css";
import { ReviewList } from "@/modules/ReviewList/ReviewList";

const reviewList = [
  {
    id: "1",
    fileName: "project.zip",
    date: "01.11.2024",
  },
  {
    id: "2",
    fileName: "file.py",
    date: "02.11.2024",
  },
  {
    id: "3",
    fileName: "file1.py",
    date: "02.11.2024",
  },
  {
    id: "4",
    fileName: "file2.py",
    date: "02.11.2024",
  },
  {
    id: "5",
    fileName: "file3.py",
    date: "02.11.2024",
  },
];

export const History: FC = () => {
  return (
    <PageLayout>
      <div className={s.historyPage}>
        <div className={s.reviewListWrapper}>
          <ReviewList reviewList={reviewList} />
        </div>
      </div>
    </PageLayout>
  );
};
