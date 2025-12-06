import { useState } from "react";
import {
  Camera,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Phone,
  Mail,
  FileText,
  Bell,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { LawyerProfile } from "@/types";
import { toast } from "@/hooks/use-toast";

interface ProfileInfoProps {
  profile: LawyerProfile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const [notifications, setNotifications] = useState({
    deadlines: true,
    overdue: true,
    newCases: true,
  });

  const [notes, setNotes] = useState(profile.notes || "");

  const handleSaveNotes = () => {
    toast({
      title: "Сохранено",
      description: "Заметки успешно сохранены",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Photo and personal info */}
      <div className="lg:col-span-1 space-y-6">
        {/* Photo */}
        <div className="card-premium p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="h-32 w-32 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center mx-auto">
              <span className="text-4xl font-display font-bold text-gold">
                {profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <label className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gold flex items-center justify-center cursor-pointer hover:bg-gold-dark transition-colors">
              <Camera className="h-5 w-5 text-primary-foreground" />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            {profile.fullName}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Адвокат</p>
          <Badge variant="gold" className="mt-3">
            Premium
          </Badge>
        </div>

        {/* Contact info */}
        <div className="card-premium p-5">
          <h3 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-gold" />
            Контакты
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold/70" />
              <span className="text-sm text-foreground">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold/70" />
              <span className="text-sm text-foreground">{profile.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle column - Details */}
      <div className="lg:col-span-1 space-y-6">
        {/* Personal details */}
        <div className="card-premium p-5">
          <h3 className="font-display text-base font-semibold text-foreground mb-4">
            Персональные данные
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <User className="h-4 w-4 text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Возраст</p>
                <p className="text-sm font-medium text-foreground">
                  {profile.age} лет
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <GraduationCap className="h-4 w-4 text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Образование</p>
                <p className="text-sm font-medium text-foreground">
                  {profile.education}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Briefcase className="h-4 w-4 text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Опыт работы</p>
                <p className="text-sm font-medium text-foreground">
                  {profile.experience}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Award className="h-4 w-4 text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Специализация</p>
                <p className="text-sm font-medium text-foreground">
                  {profile.specialization}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card-premium p-5">
          <h3 className="font-display text-base font-semibold text-foreground mb-4">
            Личные заметки
          </h3>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ваши заметки..."
            className="w-full h-32 rounded-lg border border-border bg-secondary/50 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 resize-none transition-all"
          />

          <Button
            variant="gold-outline"
            size="sm"
            className="mt-3"
            onClick={handleSaveNotes}
          >
            <Save className="h-4 w-4 mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      {/* Right column - Documents and settings */}
      <div className="lg:col-span-1 space-y-6">
        {/* Documents */}
        <div className="card-premium p-5">
          <h3 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gold" />
            Документы
          </h3>

          <div className="space-y-2">
            {profile.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-gold/30 transition-colors cursor-pointer"
              >
                <FileText className="h-4 w-4 text-gold" />
                <span className="text-sm text-foreground flex-1">
                  {doc.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            * Документы загружаются администратором
          </p>
        </div>

        {/* Notification settings */}
        <div className="card-premium p-5">
          <h3 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-gold" />
            Настройки уведомлений
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Дедлайны</p>
                <p className="text-xs text-muted-foreground">
                  Напоминания о сроках
                </p>
              </div>
              <Switch
                checked={notifications.deadlines}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, deadlines: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Просрочки</p>
                <p className="text-xs text-muted-foreground">
                  Уведомления о просроченных делах
                </p>
              </div>
              <Switch
                checked={notifications.overdue}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, overdue: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Новые дела
                </p>
                <p className="text-xs text-muted-foreground">
                  Уведомления о назначенных делах
                </p>
              </div>
              <Switch
                checked={notifications.newCases}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newCases: checked })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
