import {useDispatch} from "react-redux";
import {getNavigationRedux} from "../redux/navigation/navigationSlice";

export default function useCurrentPage({currentPage}) {
    const dispatch = useDispatch();

    dispatch(getNavigationRedux(currentPage));
}
