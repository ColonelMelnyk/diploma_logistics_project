import { logOut } from '../redux/AuthLogic';
import { useDispatch, useSelector } from 'react-redux';
import  { selectUser } from '../redux/AuthLogicSelectors';
import { useNavigate } from "react-router-dom";

const UserData = () => {
  const dispatch = useDispatch();
  const { email, name } = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <div>
      <div> 
        <p>User: {name}</p>
        <p> Mail: {email}</p>
      </div>
      <button type="button" onClick={() => { dispatch(logOut()); 
        navigate("/home");}}>
        Log Out
      </button>
    </div>
  );
};
export default UserData;