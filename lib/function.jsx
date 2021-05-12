import axios from "axios";

export async function sendFromFirst(data) {
  const result = await axios
    .post("/api/post_data/firstPost", {
      data: data,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

export async function sendIcon(data) {
  await axios
    .post("/api/post_data/icon", {
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function uploadIcon(data) {
  const link = await axios
    .post("https://api.cloudinary.com/v1_1/djccssdr9/image/upload", data)
    .then((data) => {
      return data.data.url;
    })
    .catch(function (error) {
      console.log(error);
    });

  return link;
}

export async function sendBanner(data) {
  await axios
    .post("/api/post_data/banner", {
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function uploadBannerPic(data) {
  const link = await axios
    .post("https://api.cloudinary.com/v1_1/djccssdr9/image/upload", data)
    .then((data) => {
      return data.data.url;
    })
    .catch(function (error) {
      console.log(error);
    });

  return link;
}

export async function editProfile(data) {
  await axios
    .post("/api/post_data/edit_profile", {
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function follow(data) {
  await axios
    .post("/api/post_data/follow", {
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function unFollow(data) {
  await axios
    .post("/api/post_data/unFollow", {
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function addShop(data) {
  const result = await axios
    .post("/api/post_data/add_shop", {
      data: data,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
    });

  return result;
}

export async function deleteShop(data) {
  await axios
    .post("/api/delete_data/delete_shop", {
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

export async function editShop(data) {
  const result = await axios
    .post("/api/post_data/edit_shop", {
      data: data,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
    });

  return result;
}

export async function addYourShopToMyList(data) {
  const result = await axios
    .post("/api/post_data/add_youShop_to_myList", {
      data: data,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
    });

  return result;
}

export async function getWithId(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_with_id`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getWithIdAndMoreDetail(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_with_id_and_more_detail`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getHomePageList(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_homePage_list`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getForVisitProfile(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_visit_profile`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getMyProfile(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_my_profile`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function searchingUser(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/searching_user`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function followedOrNot(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/follow_or_not`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getFollower(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_follower`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getFollowing(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_following`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getExplore(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_explore`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getNewsUpdate(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/get_news_update`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function searchingShopFromFd(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/searching_shop_from_fd`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function searchingAllShop(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/searching_all_shop`, {
      data: data,
    })
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function getWebsiteData(data) {
  const result = await axios
    .post("/api/get_data/get_website_data", {
      data: data,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      return "error";
    });

  return result;
}

export async function CheckDataBase(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/get_data/check_data_base`, {
      data: data,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}

export async function firstDataInput(data) {
  const get_data = await axios
    .post(`${process.env.WEB_URL}/api/post_data/first_data_input`, {
      data: data.data,
      login: data.first,
    })
    .then(function (response) {
      console.log(response.data);
      // return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return get_data;
}
