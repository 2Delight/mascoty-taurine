import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../../utils/redux_state/StoreHooks"

export default function MascotCanvas() {

  const color = useAppSelector((state) => state.background.color)
  const dispatch = useAppDispatch()

  return <div className="mascotPlace" style={{
    flex: 5,
    background: "white",
    overflow: "auto",
    margin: 10,
    borderRadius: "10px 0 0 0 "
  }}>
    <div className="mascot" style={{

      width: 1000,
      height: 1000, background: color

    }}>
    </div>
  </div>
}