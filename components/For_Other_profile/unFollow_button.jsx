export default function UnFollowButton(props) {
  const cancel = () => {
    props.close();
  };

  const unFollow = () => {
    props.unFollow();
    props.close();
  };

  return (
    <div className="flex flex-col border-md">
      <p className="grid px-6 py-2 text-lg place-self-center">If you unfollow, his / her list would not affect your search result.</p>
      <button className="py-2 mx-5 mt-2 font-semibold uppercase rounded-md hover:bg-indigo-500 hover:text-white" onClick={unFollow}>unfollow</button>
      
      <button className="py-2 mx-5 font-semibold uppercase rounded-md hover:bg-indigo-500 hover:text-white"  onClick={cancel}>cancel</button>
    </div>
  );
}
