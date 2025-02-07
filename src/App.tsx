import Search from "./components/Search"
import { AddItem } from "./components/AddItem"



function App() {

  return (
    <section style={{display:'flex', flexDirection:'column'}}>
      <AddItem/>
      <Search/>
      
    </section>
  )
}

export default App
