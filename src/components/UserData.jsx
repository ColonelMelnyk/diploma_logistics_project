import { logOut } from 'redux/AuthLogic';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/AuthLogicSelectors';
const UserData = () => {
  const dispatch = useDispatch();
  const { email, name } = useSelector(selectUser);

  return (
    <div>
      <div> 
        <p  className="text-[28px] opacity-80 dark:text-white">User: {name}</p>
        <p  className="text-[28px] opacity-80 dark:text-white"> Mail: {email}</p>
      </div>
      <button className="text-[28px] opacity-80 dark:text-white" type="button" href=""onClick={() => dispatch(logOut())}>
        Log Out
      </button>
    </div>
  );
};
export default UserData;