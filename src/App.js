import React, {Fragment , useState,useEffect} from "react";

function App() {

  const [file,setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);


  useEffect(() =>{
    fetch('http://localhost:9000/images/get')
    .then(res => res.json())
    .then(res => setImageList(res))
    .catch(err => {
      console.error(err);
    });
    setRefreshList(false);
  },[refreshList])

  const selectdHandler = e =>{
    //console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  const sedHandler = () => {
    if(!file){
      alert("Sin cargar Imagen");
      return;
    }
    const fromdate = new FormData()
    fromdate.append('image',file);
    
    fetch('http://localhost:9000/images/post',{
      method: 'POST',
      body: fromdate
    })
    .then(res => res.text())
    .then(res => {
      console.log(res)
      setRefreshList(true);
    })
    .catch(err => {
      console.error(err);
    });

    document.getElementById('file').value = null;
    setFile(null);

  }

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <a href="#!" className="navbar-brand">Proyecto App</a>
        </div>
      </nav>
      <br></br>
      <div className="container p-5">
        <button>Login Google</button>
      </div>
      
      <div className="container p-5">
        <div className="card p-3">
          <div className="row ">
            <div className="col-10">
              <input id="file"  onChange={selectdHandler} className="form-control" type="file"/>
            </div>
            <div className="col-2">
              <button onClick={sedHandler} type="button" className="btn btn-primary col-12">ADD</button>
            </div>
          </div> 
        </div>
      </div>

      <div className="container mt-3" style={{display:"flex",flexWrap: "wrap"}}>
        {imageList.map(image => (
          <div key={image} className="card m-2">
            <img src={'http://localhost:9000/' + image} alt="..." className="card-img-top" style={{height:"200px", width:"300px"}}></img>
          </div>
        ))}
       
      </div>

    </Fragment>
  );
    
}

export default App;
