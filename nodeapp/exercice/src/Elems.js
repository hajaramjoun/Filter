import React from "react";

const Elems = ({ list, handleDelete,handleAdd }) => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-10 col-md-offset-1">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {/* On transforme les éléments de la liste en ligne de table */}
              {list.map((e, i) => (
                /* Dans un map, React à besoin d'identifier tous les éléments créés à l'aide d'un attribut "key" */
                <tr key={"row-" + e.key}>
                  <td class="col-sm-8 col-md-6" >
                   <div className="media">
                       <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: '72px', height: '72px'}} /> </a>
                     <div className="media-body">
                      <h4 className="media-heading"><a href="#">{e.product} </a></h4>
                      <h5 className="media-heading"> by <a href="#">{e.marque} </a></h5>
                      <span>Status: </span><span className="text-success"><strong> {e.status}In Stock</strong></span>
                    </div>
                   </div>
                  </td>
                  <td class="col-sm-1 col-md-1">{e.prix}</td>
                  <td>
                    {/* Au click, on utilise la fonction de callback "handleDelete" pour envoyer l'index de la ligne au parent */}
                    <button type="button" class="btn btn-danger" onClick={() => handleDelete(i)}>  <span class="glyphicon glyphicon-remove"></span> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Elems;
