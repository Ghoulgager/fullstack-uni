const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.name} {props.ex}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.p1name} ex={props.p1ex}/>
      <Part name={props.p2name} ex={props.p2ex}/>
      <Part name={props.p3name} ex={props.p3ex}/>
    </div>
  )
}

// const Total = (props) => {
//   return (
//     <div>
      
//     </div>
//   )
// }

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1name={part1} p1ex={exercises1} p2name={part2} p2ex={exercises2} p3name={part3} p3ex={exercises3}/>
      {/* <Total /> */}
    </div>
  )
}

export default App