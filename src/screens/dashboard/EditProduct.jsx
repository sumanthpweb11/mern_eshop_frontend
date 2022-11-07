import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import Colors from "../../components/Colors";
import Spinner from "../../components/Spinner";
import { setSuccess } from "../../store/reducers/globalReducer";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import {
  useUpdateProductMutation,
  useGetProductQuery,
} from "../../store/services/productService";

import { useState } from "react";
import SizesList from "../../components/SizesList";
import toast, { Toaster } from "react-hot-toast";
import h2p from "html2plaintext";

const EditProduct = () => {
  const { id } = useParams();

  const { data: product, isFetching: fetching } = useGetProductQuery(id);

  console.log("data", product);

  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
  });

  // SIZES
  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "1 year" },
    { name: "2 years" },
    { name: "3 years" },
    { name: "4 years" },
    { name: "5 years" },
  ]);
  const [sizeList, setSizeList] = useState([]);

  // INPUT
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // COLORS
  const saveColors = (color) => {
    console.log(color);
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
    // console.log("filtered colors", filtered);
  };
  // console.log(state.colors);

  const deleteColor = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);

    setState({ ...state, colors: filtered });
  };
  // console.log("preview", preview);

  //SIZES
  const chooseSize = (sizeObject) => {
    const filtered = sizeList.filter((size) => size.name !== sizeObject.name);
    setSizeList([...filtered, sizeObject]);
  };
  // console.log(sizeList);

  const deleteSize = (name) => {
    const filtered = sizeList.filter((size) => size.name !== name);
    setSizeList(filtered);
  };

  // React Quill // DESCRIPTION
  const [value, setValue] = useState("");
  // console.log(`rich text editor ${value}`);

  const { data = [], isFetching } = useAllCategoriesQuery();

  const [updateProduct, response] = useUpdateProductMutation();

  console.log("Your response", response);

  // const [form, setForm] = useState([]);

  // Form Submission
  const createPro = (e) => {
    e.preventDefault();

    console.log("create pro", state);

    updateProduct(state);
  };

  // Toast
  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => {
        toast.error(err.msg);
      });
    }
  }, [response?.error?.data?.errors]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response?.isSuccess]);

  // Description
  useEffect(() => {
    setState({ ...state, description: value });
  }, [value, state]);

  useEffect(() => {
    if (!fetching) {
      setState(product);
      setSizeList(product.sizes);
      setValue(h2p(product.description));
    }
  }, [product]);

  console.log("your state", state);

  console.log(data, isFetching);
  return (
    <Wrapper>
      <ScreenHeader>
        <button>
          <Link to="/dashboard/products" className="btn-dark">
            Products List
          </Link>
        </button>
      </ScreenHeader>

      <Toaster position="top-right" reverseOrder={true} />
      {!fetching ? (
        <div className="flex flex-wrap -mx-3 ">
          <form onSubmit={createPro} className="w-full xl:w-8/12 p-3 ">
            <h3 className="pl-3 capitalize text-lg font-medium text-gray-400">
              Edit Product
            </h3>
            <div className="flex flex-wrap ">
              {/* PRODUCT TITLE */}
              <div className="w-full  md:w-6/12 p-3">
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="title..."
                  onChange={handleInput}
                  value={state.title}
                />
              </div>

              {/* PRODUCT PRICE */}
              <div className="w-full  md:w-6/12 p-3">
                <label htmlFor="price" className="label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                  placeholder="price..."
                  onChange={handleInput}
                  value={state.price}
                />
              </div>

              {/* PRODUCT DISCOUNT */}
              <div className="w-full  md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                  Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  className="form-control"
                  placeholder="discount..."
                  onChange={handleInput}
                  value={state.discount}
                />
              </div>

              {/* PRODUCT STOCK */}
              <div className="w-full  md:w-6/12 p-3">
                <label htmlFor="stock" className="label">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="form-control"
                  placeholder="stock..."
                  onChange={handleInput}
                  value={state.stock}
                />
              </div>

              {/* ALL CATEGORIES */}
              <div className="w-full  md:w-6/12 p-3">
                <label htmlFor="categories" className="label">
                  Categories
                </label>
                {!isFetching ? (
                  data?.categories?.length > 0 && (
                    <select
                      className="form-control"
                      name="category"
                      id="categories"
                      onChange={handleInput}
                      value={state.category}
                    >
                      <option value="">choose category</option>
                      {data?.categories?.map((category) => {
                        return (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  )
                ) : (
                  <Spinner />
                )}
              </div>

              {/* CHOOSE COLOR */}
              <div className="w-full  md:w-6/12 p-3">
                <label htmlFor="colors" className="label">
                  Colors List
                </label>
                <TwitterPicker onChangeComplete={saveColors} />
              </div>

              {/* CHOOSE SIZE */}
              <div className="w-full   p-3">
                <label htmlFor="sizes" className="label">
                  Choose Size
                </label>
                {sizes.length > 0 && (
                  <div className="flex flex-wrap -mx-3">
                    {sizes.map((size) => {
                      return (
                        <div
                          onClick={() => chooseSize(size)}
                          className="size"
                          key={size.name}
                        >
                          {size.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="w-full p-3">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <ReactQuill
                  id="description"
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  className="ql-toolbar.ql-snow"
                  placeholder="description..."
                />
              </div>

              <div className="w-full p-3">
                <input
                  className="btn btn-indigo cursor-pointer"
                  type="submit"
                  value={response.isLoading ? "Loading..." : "Save Product"}
                  disabled={response.isLoading ? true : false}
                />
              </div>
            </div>
          </form>
          <div className="w-full xl:w-4/12 p-3">
            <Colors colors={state.colors} deleteColor={deleteColor} />
            <SizesList sizeList={sizeList} deleteSize={deleteSize} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default EditProduct;
