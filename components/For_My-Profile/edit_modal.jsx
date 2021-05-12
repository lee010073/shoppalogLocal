//import Library
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const EditProfileModal = (props) => {
  //redux
  const { name } = useSelector((state) => state.navbar_name);
  const { description } = useSelector((state) => state.userDescription);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    props.edit(data);
    props.close();
  };

  return (
    <div className="px-8 pt-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-auto pt-5"
      >
        <input
          type="hidden"
          id="id"
          name="id"
          defaultValue={props && props.data.id && `${props.data.id}`}
          ref={register({ required: true })}
        />

        <div className="py-5">
          <label className="w-full ">Username (5-16 Characters)</label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2 border-2 rounded-md hover:bg-gray-200"
            defaultValue={name}
            placeholder="Enter Your Username"
            ref={register({
              required: true,
              minLength: 5,
              maxLength: 16,
              pattern: /^\S*$/,
            })}
          />
          {errors.username && (
            <p className="text-red-500">This field is required, No Space and within (5-16 characters)</p>
          )}
        </div>
        <div className="pb-5">
          <label className="w-full">Personal Status (30 characters Max.)</label>
          <textarea
            type="text"
            id="description"
            name="description"
            className="w-full p-2 border-2 rounded-md h-30 hover:bg-gray-200"
            placeholder="Optional"
            defaultValue={description}
            ref={register({ required: false, maxLength: 30 })}
          />
          {errors.description && (
            <p className="text-red-500">
              This field have a maximum 30 Character
            </p>
          )}
        </div>

        <button
          type="submit"
          className="py-2 font-semibold border-2 rounded-md hover:bg-indigo-500 hover:text-white "
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileModal;
