import { Component } from "react";
import { Popup } from "reactjs-popup";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";
import { BsTrash3, BsPencil } from "react-icons/bs";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";



import "./index.css"


class ListItem extends Component {
    state = {
        isEdited: false,
        editedValues: {
            gender: "",
            country: "",
            description: "",
            name:"",
            age: ""
        },
    }

    onToggleData = () =>{
        this.setState(prevState => ({isEdited: !prevState.isEdited}))
    }

    calculateAge = (dob) => {
        const birthday = new Date(dob);
        const ageDiffMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDiffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    handleEdit = () => {
        const { eachItem } = this.props;
        this.setState({
            isEdited: true,
            editedValues: {
                gender: eachItem.gender,
                country: eachItem.country,
                description: eachItem.description,
                name: `${eachItem.first} ${eachItem.last}`,
                age: `${this.calculateAge(eachItem.dob)}`
            },
        });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        
         // Validate age field: Allow only numeric input
    if (name === "age" && isNaN(value)) {
        return; // Ignore non-numeric input
    }

    // Validate country field: Allow only text input
    if (name === "country" && /\d/.test(value)) {
        return; // Ignore if input contains numbers
    }

    // Empty field validation: Ensure no field is left empty
    if (value.trim() === "") {
        return; // Ignore empty input
    }

        this.setState((prevState) => ({
            editedValues: {
                ...prevState.editedValues,
                [name]: value,
            },
        }));
    };

    handleSave = (e) => {
        e.preventDefault();
       
        const { editedValues } = this.state;
        console.log("Edited values:", editedValues);
        this.setState({ isEdited: false });
    };

   

    handleConfirmDelete = () => {
        const { eachItem, onDeleteItem } = this.props;
        onDeleteItem(eachItem.id);
        this.setState({ showDeleteConfirmation: false });
    };

    handleCancel = () =>{
        this.setState({isEdited: false})
    }

    

    render(){  
        const{eachItem, onSelectItem, isSelected, } = this.props
        const {isEdited, editedValues, } = this.state
        return(
            <li className="list-item-container">
                <div className="list-item-whole-content-container"> 
                    <div className="list-item-content-container"> 
                        <div className="profile-name-img-container">
                            <img src= {eachItem.picture} alt="" className="profile-pic"/>
                            {isEdited && isSelected? <input type="text" value={editedValues.name} onChange={this.handleInputChange} className="name-input-field"/> : <h2 className="name">{isEdited ? `${editedValues.name}` : `${eachItem.first} ${eachItem.last}`}</h2>}
                            
                        </div>
                        <button type="button"  onClick={() => onSelectItem(eachItem.id)} className="toggleButton">
                        {isSelected ? <HiOutlineMinus /> : <HiOutlinePlus />}
                        </button> 
                    </div>
                    {isSelected=== true &&
                        <div className="hidden-content-container">
                            <div className="age-gender-country-details-container">
                                <div className ="details-container"> 
                                    <label>Age</label>
                                    {isEdited ? <input type = "text" className="age-input-field" value={editedValues.age}/>:<p className="filed-deatils">{this.calculateAge(eachItem.dob)}</p>}
                                    
                                </div>
                                <div className ="details-container">
                                    <label>Gender</label>
                                    {isEdited? <select
                                                name="gender"
                                                value={editedValues.gender}
                                                onChange={this.handleInputChange}
                                                className="gender-select-field"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Transgender">Transgender</option>
                                                <option value="Rather not say">Rather not say</option>
                                                <option value="Other">Other</option>
                                            </select>:<p className="filed-deatils">{eachItem.gender}</p>}
                                    
                                </div>
                                <div className ="details-container">
                                    <label>Country</label>
                                    {isEdited?<input
                                                type="text"
                                                name="country"
                                                value={editedValues.country}
                                                onChange={this.handleInputChange}
                                                className="country-input-field"
                                            /> : <p className="filed-deatils">{eachItem.country}</p>}
                                    
                                </div>
                            </div>
                            <div className ="description-details-container">
                                <label>Description</label>
                                {isEdited? <textarea
                                                name="description"
                                                value={editedValues.description}
                                                onChange={this.handleInputChange}
                                                className="description-input-field"
                                            />:<p>{eachItem.description}</p>}
                                
                            </div>
                            <div className="edit-delete-buttons-container">
                                {isEdited ?  <button type="button" className="cancel-button" onClick={this.handleCancel}><MdOutlineCancel /></button>: 
                                <div className="popup-container">
                                    <Popup
                                        modal
                                        trigger={
                                            <button type="button" className="delete-button" ><BsTrash3 /></button>
                                        }
                                        >
                                        {close => (
                                            <div className="delete-confirmation-dialog">
                                            <p>Are you sure you want to delete this user?</p>
                                            <div> 
                                                <button type="button" onClick={this.handleConfirmDelete} className="delete">Delete</button>
                                                <button
                                                type="button"
                                                className="cancel"
                                                onClick={() => close()}
                                            >
                                                Cancel
                                            </button>
                                            </div>
                                            
                                            </div>
                                        )}
                                    </Popup>
                                
                                </div> 
                                }
                                {isEdited ?  
                                <button type="button" className="save-button"><MdOutlineCheckCircle /></button>: 
                                <button type="button" className="edit-button" onClick={this.handleEdit}><BsPencil /></button>
                                }
                                            
                            </div>
                        </div>
                    }
                </div>
            </li>
        )
    }
}

export default ListItem