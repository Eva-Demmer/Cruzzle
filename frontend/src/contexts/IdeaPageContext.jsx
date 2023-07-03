import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

// const ideaTest = {
//   id: 1,
//   title: "Idea 1",
//   context:
//     "This is the content. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//   user: {
//     id: 1,
//     firstname: "Sarah",
//     lastname: "Conor",
//     position: {
//       id: 1,
//       name: "Director",
//     },
//     avatar_url: "https://picsum.photos/200",
//     agency: {
//       id: 1,
//       name: "Wildforge",
//       city: "Bordeaux",
//       country: "France",
//     },
//   },
//   created_at: "2022-11-23T12:33:11.000Z",
//   archived_at: null,
//   deleted_at: null,
//   goal: "Achieve a sustainable future.",
//   profits: "Increase revenue and market share.",
//   risks: "Mitigate potential risks.",
//   cloudshare: null,
//   primary_img: "https://picsum.photos/500/500",
//   views: 200,
//   idea_category: [
//     {
//       id: 13,
//       category: {
//         label: "Social Impact",
//         color: "rgba(90, 200, 250, 0.87)",
//       },
//     },
//     {
//       id: 14,
//       category: {
//         label: "Sports and Recreation",
//         color: "rgba(88, 86, 214, 0.87)",
//       },
//     },
//   ],
//   attachment: [],
//   idea_teams: [
//     {
//       user_id: 1,
//       user: {
//         firstname: "Sarah",
//         lastname: "Conor",
//         position: {
//           id: 1,
//           name: "Director",
//         },
//         avatar_url: "https://picsum.photos/200",
//         agency: {
//           id: 1,
//           name: "Wildforge",
//           city: "Bordeaux",
//           country: "France",
//         },
//       },
//     },
//     {
//       user_id: 2,
//       user: {
//         firstname: "Nelson",
//         lastname: "Monfort",
//         position: {
//           id: 1,
//           name: "Director",
//         },
//         avatar_url: "https://picsum.photos/200",
//         agency: {
//           id: 2,
//           name: "SalesIt",
//           city: "Paris",
//           country: "France",
//         },
//       },
//     },
//     {
//       user_id: 3,
//       user: {
//         firstname: "John",
//         lastname: "Doe",
//         position: {
//           id: 1,
//           name: "Director",
//         },
//         avatar_url:
//           "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
//         agency: {
//           id: 3,
//           name: "Manafo",
//           city: "Madrid",
//           country: "Espagne",
//         },
//       },
//     },
//     {
//       user_id: 4,
//       user: {
//         firstname: "Florent",
//         lastname: "Panini",
//         position: {
//           id: 1,
//           name: "Director",
//         },
//         avatar_url: "https://picsum.photos/200",
//         agency: {
//           id: 2,
//           name: "SalesIt",
//           city: "Paris",
//           country: "France",
//         },
//       },
//     },
//     {
//       user_id: 5,
//       user: {
//         firstname: "Test5",
//         lastname: "Test5",
//         position: {
//           id: 1,
//           name: "Director",
//         },
//         avatar_url: "https://picsum.photos/200",
//         agency: {
//           id: 2,
//           name: "SalesIt",
//           city: "Paris",
//           country: "France",
//         },
//       },
//     },
//     {
//       user_id: 6,
//       user: {
//         firstname: "Test6",
//         lastname: "Test",
//         position: {
//           id: 1,
//           name: "Director",
//         },
//         avatar_url: "https://picsum.photos/200",
//         agency: {
//           id: 2,
//           name: "SalesIt",
//           city: "Paris",
//           country: "France",
//         },
//       },
//     },
//   ],
//   _count: {
//     idea_like: 3,
//     comment: 1,
//     attachment: 0,
//     idea_teams: 4,
//   },
// };

export const IdeaPageContext = createContext({});

function IdeaPageProvider({ children }) {
  const [idea, setIdea] = useState([]);

  const contextValue = useMemo(() => {
    return {
      idea,
      setIdea,
    };
  }, [idea, setIdea]);

  return (
    <IdeaPageContext.Provider value={contextValue}>
      {children}
    </IdeaPageContext.Provider>
  );
}

IdeaPageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaPageProvider;
