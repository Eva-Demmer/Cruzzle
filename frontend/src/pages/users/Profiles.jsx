import { useEffect, useState } from "react";
import FilterBarCommunity from "../../components/community/FilterBarCommunity";
import FilterCommunityProvider from "../../contexts/FilterCommunityContext";
import FilterPanelCommunity from "../../components/community/FilterPanelCommunity";
import CardsDisplayerCommunity from "../../components/community/CardsDisplayerCommunity";
import apiRoles from "../../services/api.roles";
import apiPositions from "../../services/api.positions";
import apiAgencies from "../../services/api.agencies";

function Community() {
  const [roleFilter, setRoleFilter] = useState([]);
  const [positionFilter, setPositionFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [agenciesFilter, setAgenciesFilter] = useState([]);

  const positionsFetch = async () => {
    try {
      const data = await apiPositions();
      if (data) {
        setPositionFilter(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rolesFetch = async () => {
    try {
      const data = await apiRoles();
      if (data) {
        setRoleFilter(
          data.map((role) => ({
            name: role.name,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const agenciesFetch = async () => {
    try {
      const data = await apiAgencies();
      if (data) {
        setAgenciesFilter(data.sort((a, b) => a.name.localeCompare(b.name)));
        const uniqueCountries = data
          .sort((a, b) => a.country.localeCompare(b.country))
          .reduce((unique, item) => {
            if (!unique.find((agency) => agency.country === item.country)) {
              unique.push(item);
            }
            return unique;
          }, []);
        setLocationFilter(uniqueCountries);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    rolesFetch();
    positionsFetch();
    agenciesFetch();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen" aria-label="page">
      <FilterCommunityProvider>
        <div aria-label="header filter">
          <header className="w-full px-6">
            <h2>Community</h2>
            <FilterBarCommunity
              roleFilter={roleFilter}
              positionFilter={positionFilter}
              locationFilter={locationFilter}
              agenciesFilter={agenciesFilter}
            />
          </header>
        </div>
        <CardsDisplayerCommunity />
        <FilterPanelCommunity
          roleFilter={roleFilter}
          positionFilter={positionFilter}
          locationFilter={locationFilter}
          agenciesFilter={agenciesFilter}
        />
      </FilterCommunityProvider>
    </div>
  );
}
export default Community;
