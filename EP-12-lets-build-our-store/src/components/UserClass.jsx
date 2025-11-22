import React from 'react';

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:0,
            count2:1,
            data:[]
        }

         console.log(this.props.name + " Child Constructor Called");
    }

    async componentDidMount(){
        console.log(this.props.name + " Child Component Did Mount Called");
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const res = await data.json();
        console.log(res);
        this.setState({data:res});

        this.timer = setInterval(() => {
            this.setState((prevState) => ({
                count: prevState.count + 1,
                count2: prevState.count2 + 2
            }));
        }, 1000);

    }

    componentDidUpdate(){
        console.log(" Child Component Did Update Called");
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        // Cleanup code before the component is removed from the DOM
        console.log(" Child Component Will Unmount Called");
    }

    render(){
        console.log(this.props.name + " Child Render Called");

        const { name } = this.props; 
        const {count,count2} = this.state;

        return(
            <div>
                <button onClick={()=>this.setState({count:count+1,count2:count2+2})}>Click Me to Increase Count</button>
                <h2>Count : {count}</h2>
                <h2>Count2 : {count2}</h2>
                {this.state.data.map(user => (
                    <div key={user.id}>
                            <h1>Name : {user.name}</h1>
                            <h3>Email: {user.email}</h3>
                            <h4>Location : {user.address.city}, {user.address.country}</h4>
                            <h4>Phone : {user.phone}</h4>
                            <h4>Website : {user.website}</h4>
                            <h4>Company : {user.company.name}</h4>
                            <h4>Catch Phrase : {user.company.catchPhrase}</h4>
                            <h4>BS : {user.company.bs}</h4>
                    </div>
                   
                
                ))}
            </div>
            
        )
    }
}

export default UserClass;