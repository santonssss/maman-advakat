import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { mockProfile } from "@/data/mockData";

const Profile = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Профиль
        </h1>
        <p className="text-muted-foreground mt-1">
          Персональные данные и настройки
        </p>
      </div>

      {/* Profile info */}
      <ProfileInfo profile={mockProfile} />
    </div>
  );
};

export default Profile;
