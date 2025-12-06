import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseInfo } from "@/components/case-detail/CaseInfo";
import { CaseDiary } from "@/components/case-detail/CaseDiary";
import { mockCases, mockDiaryEntries } from "@/data/mockData";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseData = mockCases.find((c) => c.id === id);
  const diaryEntries = mockDiaryEntries.filter((e) => e.caseId === id);

  if (!caseData) {
    return (
      <div className="card-premium p-12 text-center">
        <p className="text-muted-foreground">Дело не найдено</p>
        <Link to="/cases">
          <Button variant="gold-outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к делам
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <Link to="/cases">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Карточка дела
          </h1>
          <p className="text-muted-foreground mt-1">{caseData.number}</p>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CaseInfo caseData={caseData} />
        <CaseDiary entries={diaryEntries} />
      </div>
    </div>
  );
};

export default CaseDetail;
