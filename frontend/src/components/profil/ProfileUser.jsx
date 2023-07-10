import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { UserProfileContext } from "../../contexts/UserProfile";
import TopSectionProfil from "./TopSectionProfil";
import ProfilesTabs from "./ProfilesTabs";
import { apiUserById } from "../../services/api.users";

function ProfileUser() {
  const { user: currentUser } = useContext(UserContext);
  const { setUser, isLoading, setIsLoading } = useContext(UserProfileContext);
  const { id } = useParams();
  const isCurrentUserProfile =
    parseInt(id, 10) === parseInt(currentUser.id, 10);

  useEffect(() => {
    const userProfilLoad = async () => {
      try {
        setIsLoading(true);
        const update = await apiUserById(id);
        if (update) {
          setUser(update.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    userProfilLoad();
  }, [isCurrentUserProfile]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <TopSectionProfil />
      <ProfilesTabs />
    </>
  );
}
export default ProfileUser;
