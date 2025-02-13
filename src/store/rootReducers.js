import agentReducer from "./Reducers/agentReducer";
import authReducer from "./Reducers/authReducer";
import boAuthReducer from "./Reducers/boAuthReducer";
import boChatReducer from "./Reducers/boChatReducer";
import boDetailsReducer from "./Reducers/boDetailsReducer";
import boHomeReducer from "./Reducers/boHomeReducer";
import categoryReducer from "./Reducers/categoryReducer";
import sellerChatReducer from "./Reducers/sellerChatReducer";
import sellerDetailsReducer from "./Reducers/sellerDetailsReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  agent: agentReducer,
  boAuth: boAuthReducer,
  boHome: boHomeReducer,
  boChat: boChatReducer,
  sellerChat: sellerChatReducer,
  sellerDetail: sellerDetailsReducer,
  boDetail: boDetailsReducer,
};

export default rootReducer;
