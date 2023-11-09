Page({
  data: {
    baseUrl: "http://localhost:8000/api/categories?order_by=desc",
    // cat_data: [
    //   {
    //     "id": 9,
    //     "image": null,
    //     "created_at": "2023-10-18T23:30:33.000000Z",
    //     "updated_at": "2023-10-18T23:30:33.000000Z",
    //     "name": {
    //       "en": "Test Category 2",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   },
    //   {
    //     "id": 7,
    //     "image": "uploads/Cb5L2vjVLsaQqbYije3xfuejTmGnO3dWmE13HvgL.png",
    //     "created_at": "2023-10-18T03:27:11.000000Z",
    //     "updated_at": "2023-10-18T03:27:11.000000Z",
    //     "name": {
    //       "en": "Category 5",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   },
    //   {
    //     "id": 8,
    //     "image": null,
    //     "created_at": "2023-10-18T03:27:11.000000Z",
    //     "updated_at": "2023-10-18T03:27:11.000000Z",
    //     "name": {
    //       "en": "Category 5",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   },
    //   {
    //     "id": 6,
    //     "image": "uploads/Q0riy8Y2hzLqApCnrF2oGkH5EEvvWd55CqJRXKPn.png",
    //     "created_at": "2023-10-18T03:26:03.000000Z",
    //     "updated_at": "2023-10-18T03:26:03.000000Z",
    //     "name": {
    //       "en": "Category 5",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   },
    //   {
    //     "id": 5,
    //     "image": null,
    //     "created_at": "2023-10-18T03:25:55.000000Z",
    //     "updated_at": "2023-10-18T03:25:55.000000Z",
    //     "name": {
    //       "en": "Category 5",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   },
    //   {
    //     "id": 4,
    //     "image": "uploads/uIxmOW9yopZSmSzQ7MAgyROYZ1RoYqzJnczqlgPA.png",
    //     "created_at": "2023-10-18T03:25:28.000000Z",
    //     "updated_at": "2023-10-19T03:12:07.000000Z",
    //     "name": {
    //       "en": "Category",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   },
    //   {
    //     "id": 2,
    //     "image": "uploads/mtkGlcfQ8SAWBwxgyMQEDgI90rM9h2EZvy1Zx20L.png",
    //     "created_at": "2023-10-18T03:23:12.000000Z",
    //     "updated_at": "2023-10-18T03:43:55.000000Z",
    //     "name": {
    //       "en": "Category 3",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   },
    //   {
    //     "id": 1,
    //     "image": "uploads/DbHqdRtunKOQb9SWgMV0qWCB1pjO3l3YRLp500Ww.png",
    //     "created_at": null,
    //     "updated_at": "2023-10-19T03:07:20.000000Z",
    //     "name": {
    //       "en": "llllllmmm",
    //       "am": null,
    //       "tr": null,
    //       "or": null,
    //       "sm": null
    //     }
    //   }
    // ]
    cat_data: [],
    isLoading: false,
  },
  onLoad(option) {
    console.log("load", option)
    this.setData({
      isLoading: true
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptData', { data: "llll" })
    eventChannel.on('acceptData', function (data) {
      console.log("emited", data)
    })
  },
  onReady() {
    ma.request({
      url: "http://localhost:8000/api/categories?order_by=desc",
      method: "GET",
      // data: data,
      success: (res) => {
        console.log("cat-res", res.data.data.data)
        // this.data.cat_data.push(res.data.data.data)
        this.setData({
          cat_data: res.data.data.data,
          isLoading: false
        })

      },
    });

    console.log("ready")
  },
  onShow() {
    console.log("show")
  },
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },
  categoryList(data) {
    console.log("cat-data", data)
  },
  getCategories() {
    ma.request({
      url: "http://localhost:8000/api/categories?order_by=desc",
      method: "GET",
      // data: data,
      success: (res) => {
        console.log("cat-res", res.data.data.data)
        this.data.cat_data.push(res.data.data.data)
        // this.onReady(res.data);
        // this.onShow(res.data);
        // this.onLoad(res.data);
      },
    });
  },
  navigateToSubCategory(e) {
    const id = e.target.dataset.itemid
    console.log('id', id)
    ma.navigateTo({
      url: `../subcategory/subcategory?id=${id}`,
    })
  }
});