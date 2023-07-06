import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfilesTabs from "../../components/profil/ProfilesTabs";
import TopSectionProfil from "../../components/profil/TopSectionProfil";
import { UserContext } from "../../contexts/UserContext";
import { apiUserById } from "../../services/api.users";

function Profile() {
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const userIdAsync = async (userId) => {
    const result = await apiUserById(userId);
    if (result) {
      setUser(result.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    userIdAsync(id);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full">
      <TopSectionProfil />
      <ProfilesTabs />
    </div>
  );
}
export default Profile;
