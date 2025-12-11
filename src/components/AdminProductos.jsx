import { useEffect, useState, useContext } from "react";
import { FaEdit, FaSave, FaTrash, FaPlus } from "react-icons/fa";
import { SearchContext } from "../../context/SearchContext";

function AdminProductos() {

  const { busqueda } = useContext(SearchContext);

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 20;

  const [editId, setEditId] = useState(null);
  const [editCampo, setEditCampo] = useState("");
  const [editValor, setEditValor] = useState("");

  const [mostrarFormNuevo, setMostrarFormNuevo] = useState(false);

  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [erroresNuevo, setErroresNuevo] = useState({});


  const API_URL = "https://68f5097cb16eb6f468363490.mockapi.io/productos";

  useEffect(() => {
    fetch(API_URL)
      .then((resp) => resp.json())
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message));
  }, []);

  const iniciarEdicion = (id, campo, valorActual) => {
    setEditId(id);
    setEditCampo(campo);
    setEditValor(valorActual);
  };

  const guardarEdicion = async (id) => {
    const productoOriginal = productos.find((p) => p.id === id);

    const actualizado = {
      ...productoOriginal,
      [editCampo]: editValor
    };

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizado),
    });

    setProductos((prev) =>
      prev.map((p) => (p.id === id ? actualizado : p))
    );

    setEditId(null);
    setEditCampo("");
    setEditValor("");
  };

  const handleChangeNuevo = (e) => {
    const { name, value } = e.target;

    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value
    }));

    setErroresNuevo((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const validarNuevoProducto = () => {
    const errores = {};

    if (!nuevoProducto.name.trim()) {
      errores.name = "El nombre es obligatorio.";
    }

    const priceNum = Number(nuevoProducto.price);
    if (!nuevoProducto.price || isNaN(priceNum) || priceNum <= 0) {
      errores.price = "El precio debe ser mayor que 0.";
    }

    if (!nuevoProducto.description || nuevoProducto.description.trim().length < 10) {
      errores.description = "La descripción debe tener al menos 10 caracteres.";
    }

    return errores;
  };

  const handleSubmitNuevo = async (e) => {
    e.preventDefault();

    const errores = validarNuevoProducto();
    setErroresNuevo(errores);

    if (Object.keys(errores).length > 0) {
      return;
    }

    const productoAEnviar = {
      ...nuevoProducto,
      price: Number(nuevoProducto.price)
    };

    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoAEnviar)
    });

    const creado = await resp.json();

    setProductos((prev) => [...prev, creado]);

    setNuevoProducto({
      name: "",
      description: "",
      price: "",
      image: "",
    });

    setErroresNuevo({});
    setMostrarFormNuevo(false);
  };



  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    setProductos((prev) => prev.filter((prod) => prod.id !== id));
  };

  if (productos.length === 0) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>Ocurrió un error: {error}</h2>;
  }

  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(
        indicePrimerProducto,
        indiceUltimoProducto
    );

    
    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    
  return (
    <div>
      {mostrarFormNuevo && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar producto</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMostrarFormNuevo(false)}
                  ></button>
                </div>

                <form onSubmit={handleSubmitNuevo}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nombre"
                        value={nuevoProducto.name}
                        onChange={handleChangeNuevo}
                      />
                      {erroresNuevo.name && (
                        <p style={{ color: "red" }}>{erroresNuevo.name}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <textarea
                        name="description"
                        className="form-control"
                        placeholder="Descripción (mínimo 10 caracteres)"
                        value={nuevoProducto.description}
                        onChange={handleChangeNuevo}
                      />
                      {erroresNuevo.description && (
                        <p style={{ color: "red" }}>{erroresNuevo.description}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Precio"
                        value={nuevoProducto.price}
                        onChange={handleChangeNuevo}
                      />
                      {erroresNuevo.price && (
                        <p style={{ color: "red" }}>{erroresNuevo.price}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        name="image"
                        className="form-control"
                        placeholder="URL de imagen"
                        value={nuevoProducto.image}
                        onChange={handleChangeNuevo}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setMostrarFormNuevo(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar producto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

 <div className="container productos-container">
            <div className="row gy-4 gx-5">

                {productosFiltrados.length === 0 && (
                    <p className="text-center mt-4">
                        No hay productos que coincidan con la búsqueda.
                    </p>
                )}

                {productosActuales.map((producto) => (

            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <img
                  src={producto.image}
                  alt={producto.name}
                  className="card-image"
                />

                <h3 className="card-name">
                  {editId === producto.id && editCampo === "name" ? (
                    <input
                      value={editValor}
                      onChange={(e) => setEditValor(e.target.value)}
                    />
                  ) : (
                    producto.name
                  )}

                  {editId === producto.id && editCampo === "name" ? (
                    <FaSave
                      style={{ marginLeft: "10px", cursor: "pointer", color: "green" }}
                      onClick={() => guardarEdicion(producto.id)}
                    />
                  ) : (
                    <FaEdit
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => iniciarEdicion(producto.id, "name", producto.name)}
                    />
                  )}
                </h3>

                <p className="card-description">
                  {editId === producto.id && editCampo === "description" ? (
                    <textarea
                      value={editValor}
                      onChange={(e) => setEditValor(e.target.value)}
                    />
                  ) : (
                    producto.description
                  )}

                  {editId === producto.id && editCampo === "description" ? (
                    <FaSave
                      style={{ marginLeft: "10px", cursor: "pointer", color: "green" }}
                      onClick={() => guardarEdicion(producto.id)}
                    />
                  ) : (
                    <FaEdit
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() =>
                        iniciarEdicion(
                          producto.id,
                          "description",
                          producto.description
                        )
                      }
                    />
                  )}
                </p>

                <p className="card-price">
                  {editId === producto.id && editCampo === "price" ? (
                    <input
                      type="number"
                      value={editValor}
                      onChange={(e) => setEditValor(e.target.value)}
                    />
                  ) : (
                    `$${producto.price}`
                  )}

                  {editId === producto.id && editCampo === "price" ? (
                    <FaSave
                      style={{ marginLeft: "10px", cursor: "pointer", color: "green" }}
                      onClick={() => guardarEdicion(producto.id)}
                    />
                  ) : (
                    <FaEdit
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => iniciarEdicion(producto.id, "price", producto.price)}
                    />
                  )}
                </p>

                <FaTrash
                  size={20}
                  style={{ marginTop: "10px", cursor: "pointer", color: "red" }}
                  onClick={() => eliminarProducto(producto.id)}
                />
              </div>
            </div>
          ))}

        </div>

        <div className="d-flex justify-content-center my-4">
                {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"
                            }`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        <button
          onClick={() => setMostrarFormNuevo(!mostrarFormNuevo)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 20px",
            borderRadius: "30px",
            backgroundColor: "#007bff",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            border: "none",
            fontSize: "1rem"
          }}
        >
          <FaPlus />
          Agregar producto
        </button>
      </div>
    </div>
  );
}

export default AdminProductos;
