import { useContext } from "react";
import TeamBuilder from "../idea/TeamBuilder";
import { IdeaFormContext } from "../../contexts/IdeaFormContext";
import { apiUsers } from "../../services/api.users";

function IdeaTeam() {
  const { teamSelect, setTeamSelect } = useContext(IdeaFormContext);

  const userList = () => {
    const response = apiUsers().then((res) => {
      return res.map((user) => ({
        id: user.id,
        avatar_url: user.avatar_url,
        firstname: user.firstname,
        lastname: user.lastname,
      }));
    });
    return response;
  };

  return (
    <div className="my-8" aria-label="Team">
      <h2 className="text-xl sm:text-2xl font-bold my-4">Team</h2>
      <div className="mx-6 my-6">
        <TeamBuilder
          list={teamSelect}
          onChange={setTeamSelect}
          getOptions={userList}
        />
      </div>
    </div>
  );
}

export default IdeaTeam;
