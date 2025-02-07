import Search from "./components/Search"
import { AddItem } from "./components/AddItem"
import { UpdateItem } from "./components/UpdateItem";
import DeleteItem from "./components/DeleteItem";


function App() {

  return (
    <section style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', gap:'10px'}}>
        <AddItem/>  
        <UpdateItem/>
        <DeleteItem/>
      </div>
      <Search/>
      
    </section>
  )
}

export default App
