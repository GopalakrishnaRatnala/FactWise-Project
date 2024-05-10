import { Component } from 'react';

import { BsSearch } from "react-icons/bs";

import ListItem from "./components/ListItem"
import './App.css';

class App extends Component{

  state = {listOfCelebrities: [], filteredList: [], searchQuery: "", selectedItemId: null}

  componentDidMount(){
    this.fetchCelebritiesData()
  }

  fetchCelebritiesData = async () =>{
    try {
      const response = await fetch('/celebritiesList.json'); 
      const data = await response.json();
      this.setState({ listOfCelebrities: data , filteredList: data});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleSearch = (event) =>{
    const{listOfCelebrities} = this.state
    this.setState({searchQuery: event.target.value})
    const searchList = listOfCelebrities.filter(eachCelebrity => eachCelebrity.first.toLowerCase().includes(event.target.value) || eachCelebrity.last.toLowerCase().includes(event.target.value))
    this.setState({filteredList: searchList})
  }

  handleSelectItem = (itemId) => {
    this.setState(prevState => ({
      selectedItemId: prevState.selectedItemId === itemId ? null : itemId
    }));
  }

  handleDelete = (itemId) => {
    this.setState(prevState => ({
        listOfCelebrities: prevState.listOfCelebrities.filter(item => item.id !== itemId),
        filteredList: prevState.filteredList.filter(item => item.id !== itemId),
        selectedItemId: null 
    }));
}


  render(){
    const{ searchQuery, filteredList, selectedItemId} = this.state
    console.log(searchQuery)

    return(
      <div className='App-container'> 
        <div className='App-content-container'>
          <h1 className='heading'>List Of celebrities</h1>
          <div className='serach-container'> 
          <BsSearch className='search-icon'/>
          <input type='search' className='search-input' placeholder='Search user' onChange={this.handleSearch} value={searchQuery}/>
          </div>
          
          <ul className='list-container'>
            {filteredList.map(eachItem => < ListItem eachItem={eachItem} key={eachItem.id} isSelected={eachItem.id === selectedItemId} onSelectItem={this.handleSelectItem} onDeleteItem={this.handleDelete}
/>)}
          </ul>

        </div>
      </div>
    )
  }
}

export default App;
