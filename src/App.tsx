import { Content } from "./components/content/content.component"
import { Header } from "./components/header/header.component"
import { ListProvider } from "./providers/list.proivder"

export const App: React.FC = () => {
  return (
    <>
      <ListProvider>
        
        <Header />
        <Content />

      </ListProvider>     
    </>
  )
}