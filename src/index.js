import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
class Button extends React.Component{
    render(){
        return(

            <div 
                className="Button"
                onClick={this.props.onClick}
                data-value={this.props.value}
                data-style={this.props.style}>  
                
                <button className={this.props.style}>{this.props.label}</button>
            </div>
        );

    }
}
class Keypad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: 0,
            numberBuilder: "",
            firstNum: "",
            operation: "",
            repeatKeyFlag: false
        };
    }
    createBtns(value, label, style){
        return(
            
        <Button
            value={value}
            label={label}
            style={style}
            onClick={() => this.handleClick(value)}
            />
            )
            
       
    }
    //TODO: FACTOR MATH LOGIC INTO SEPERATE FUNCTIONS//////////////////////
    handleClick(value){
        const MAX_LENGTH = 14

        
        if(typeof value == "number" && this.state.numberBuilder.length <= MAX_LENGTH){
            
            //if first number is 0, dont accept
            if(this.state.numberBuilder === "" && value === 0){
                return;
            }

            this.setState({numberBuilder: `${this.state.numberBuilder}${value}`}, () => {
                this.setState({input: this.state.numberBuilder});
              });

        }
        if(value === "clear"){

              this.setState({
                input: 0,
                numberBuilder: "",
                firstNum: "",
                operation: ""});
        }
        if(value === "equals"){
            let x;
            if(this.state.operation === ""){
                return;
            }
            if(this.state.operation === "add"){
                x = Number(this.state.firstNum) + Number(this.state.numberBuilder)    
            }
            if(this.state.operation === "subtract"){
                x = Number(this.state.firstNum) - Number(this.state.numberBuilder)               
            }
            if(this.state.operation === "multiply"){
                x = Number(this.state.firstNum) * Number(this.state.numberBuilder) 
            }
            if(this.state.operation === "divide"){
                x = Number(this.state.firstNum) / Number(this.state.numberBuilder) 
            }   
            this.setState({
                input: x,
                firstNum: x,
                numberBuilder: x,
                operation: ""})  
        }
        if(value === "add"){
                      
            if(this.state.firstNum !== "" && this.state.numberBuilder === ""){
                return;    
            }
            //If you click + instead of =
            if(this.state.firstNum !== "" && this.state.numberBuilder !== "" && this.state.operation !== ""){ 
                    let x = this.completeOperation(Number(this.state.firstNum), Number(this.state.numberBuilder))
                    this.setState({
                        input: x,
                        firstNum: x,
                        numberBuilder: "",
                        operation: "add"
                    });
                        
                
            }
            else{
                this.setState({                
                    firstNum: this.state.numberBuilder,
                    operation: "add",
                    numberBuilder: ""
                    });
            }
            
        }

        if(value === "subtract"){
            if(this.state.firstNum !== "" && this.state.numberBuilder === ""){
                return;    
            }
            //If you click - instead of =
            if(this.state.firstNum !== "" && this.state.numberBuilder !== "" && this.state.operation !== ""){ 
                    let x = this.completeOperation(Number(this.state.firstNum), Number(this.state.numberBuilder))
                    this.setState({
                        input: x,
                        firstNum: x,
                        numberBuilder: "",
                        operation: "subtract"
                    });
                        
                
            }
            else{
                this.setState({                
                    firstNum: this.state.numberBuilder,
                    operation: "subtract",
                    numberBuilder: ""
                    });
            }    
        }
        if(value === "multiply"){
            if(this.state.firstNum !== "" && this.state.numberBuilder === ""){
                return;    
            }
            //If you click * instead of =
            if(this.state.firstNum !== "" && this.state.numberBuilder !== "" && this.state.operation !== ""){ 
                    let x = this.completeOperation(Number(this.state.firstNum), Number(this.state.numberBuilder))
                    this.setState({
                        input: x,
                        firstNum: x,
                        numberBuilder: "",
                        operation: "multiply"
                    });
                        
                
            }
            else{
                this.setState({                
                    firstNum: this.state.numberBuilder,
                    operation: "multiply",
                    numberBuilder: ""
                    });
            }      
        } 
        if(value === "divide"){
            if(this.state.firstNum !== "" && this.state.numberBuilder === ""){
                return;    
            }
            //If you click * instead of =
            if(this.state.firstNum !== "" && this.state.numberBuilder !== "" && this.state.operation !== ""){ 
                    let x = this.completeOperation(Number(this.state.firstNum), Number(this.state.numberBuilder))
                    this.setState({
                        input: x,
                        firstNum: x,
                        numberBuilder: "",
                        operation: "divide"
                    });
                        
                
            }
            else{
                this.setState({                
                    firstNum: this.state.numberBuilder,
                    operation: "divide",
                    numberBuilder: ""
                    });
            }     
        }    
        if(value === "decimal"){

            if(!this.state.numberBuilder.includes(".")){
                if(this.state.numberBuilder === ""){
                    this.setState({
                        numberBuilder: this.state.numberBuilder + "0.",
                        input: this.state.numberBuilder + "0."
                    })
                }
                else{
                    this.setState({
                        numberBuilder: this.state.numberBuilder + ".",
                        input: this.state.numberBuilder + "."
                    })
                }
            }
        }
        if(value === "negative"){
            this.setState({
                numberBuilder: this.state.numberBuilder * -1,
                input: this.state.numberBuilder * -1
            })
        }
        if(value === "square"){
            this.setState({
                numberBuilder: this.state.numberBuilder * this.state.numberBuilder,
                input: this.state.numberBuilder * this.state.numberBuilder
            })
        }
        if(value === "root"){
            this.setState({
                numberBuilder: Math.sqrt(this.state.numberBuilder),
                input: Math.sqrt(this.state.numberBuilder)
            })
        }
    }

    completeOperation(x, y){
          
        if(this.state.operation === "add"){
            return x + y;
         }
        if(this.state.operation === "subtract"){
            return x - y;
        }
        if(this.state.operation === "multiply"){
            return x * y;
        }
        if(this.state.operation === "divide"){
            return x / y;
        }
        
    }
    render(){

        return(
         <React.Fragment>   
           <Display output={this.state.input} />
            <div className="Keypad">
            
                <table>
                    <thead>
                        <tr>             
                            <td> {this.createBtns(1, 1, "numberbtn")}</td>
                            <td> {this.createBtns(2, 2, "numberbtn")}</td>
                            <td> {this.createBtns(3, 3, "numberbtn")}</td>
                            <td> {this.createBtns("divide", '/', "functionbtn")}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {this.createBtns(4, 4, "numberbtn")}</td>
                            <td> {this.createBtns(5, 5, "numberbtn")}</td>
                            <td> {this.createBtns(6, 6, "numberbtn")}</td>
                            <td> {this.createBtns("multiply", '*', "functionbtn")}</td>
                        </tr>
                    
                        <tr>
                            <td> {this.createBtns(7, 7, "numberbtn")}</td>
                            <td> {this.createBtns(8, 8, "numberbtn")}</td>
                            <td> {this.createBtns(9, 9, "numberbtn")}</td>
                            <td> {this.createBtns("subtract", '-', "functionbtn")}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>{this.createBtns(0, 0, "numberbtn")}</td>
                            <td> {this.createBtns("negative", '+/-', "numberbtn")}</td>
                            <td> {this.createBtns("decimal", '.', "numberbtn")}</td>
                            <td> {this.createBtns("add", '+', "functionbtn")}  </td>
                        </tr>
                        <tr>
                            <td>{this.createBtns("clear", 'c', "functionbtn")}</td>
                            <td>{this.createBtns("square", '^2', "functionbtn")}</td>                       
                            <td>{this.createBtns("root", 'rt', "functionbtn")}</td>
                            <td>{this.createBtns("equals", '=', "equalsbtn")}</td>
                            
                            
                        </tr>
                        <tr>
                            
                        </tr>
                    </tfoot>
                </table>
            
            </div>
            </React.Fragment>
            )
    }

}

class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentSize: 0,
        };
    }

    updateDisplayDecimal(){
        const MAX_LENGTH = 14;
       if(typeof this.props.output !== "undefined" && this.props.output.length > MAX_LENGTH){
           console.log(this.props.output.length)
       }
        return this.props.output
    }

    render(){
        
        return(

            <div
                className="Display"
                output={this.props.output}
                >
                    
                {this.updateDisplayDecimal()}
                    
            </div>

        );
    }
}
class Calculator extends React.Component{
    
    render(){
        
        return(
            
            
            <div className="Calculator">
                React Calculator
                <Keypad />
            </div>
            
        );
    }
}


ReactDOM.render(<Calculator />, document.getElementById("root"));
