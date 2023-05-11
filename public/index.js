/* global Vue, VueRouter, axios */


var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to FitJourney!"
    };
  },
  methods: {},
  computed: {}
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer" + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user.id);
          router.push("/profile/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    router.push("/login");
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },

  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var UsersShowPage = {
  template: "#users-show-page",
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get("api/profile/:id")
    .then(
      function(response){
        this.user = response.data;
        console.log(this.user);
      }.bind(this))
  },
  methods: {},
  computed: {}
};


// var Profile = {
//   template:"#users-show-page",
//   data: function(){
//     return {
//       user: {}
//     };
//   },
//   created: function(){
//     axios.get("/api/users/" + this.$route.params.id).then(function(response){
//       this.user = response.data;
//       console.log(this.user);
//     }.bind(this));
//   },
//   methods: {},
//   computed: {}
// };

var ProfileEditPage = {
  template: "#profile-edit-page",
  data: function() {
    return {
      name: "",
      email: "",
      weight: "",
      goals: "",
      favorite_activities: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/profile/" + this.$route.params.id).then(
      function(response) {
        this.name = response.data.name;
        this.email = response.data.email;
        this.weight = response.data.weight;
        this.goals = response.data.goals;
        this.favorite_activities = response.data.favorite_activities;
      }.bind(this)
    );
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        weight: this.weight,
        goals: this.goals,
        favorite_activities: this.favorite_activities
      };
      axios
        .patch("/api/profile/" + this.$route.params.id, params)
        .then(
          function(response) {
            router.push("/profile/");
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var DeleteProfile = {
  template: "<h1>Delete</h1>",
  created: function() {
    axios.delete("/api/profile/" + this.$route.params.id).then(
      function(response) {
        this.name = response.data.name;
        this.email = response.data.email;
        this.weight = response.data.weight;
        this.goals = response.data.goals;
        this.favorite_activities = response.data.favorite_activities;
      }.bind(this)
    );
    router.push("/");
  }
};

var MealIndex = {
  template: "#meal-card",
  data: function() {
    return {
      meals: [],
      search: ""
    };
  },
  created: function() {
    axios.get("/api/meals").then(
      function(response) {
        this.meals = response.data;
        console.log(this.meals);
      }.bind(this)
    );
  },
  methods: {},
  computed: {
    filteredMeals: function() {
      return this.meals.filter(meal => {
        return meal.meal_category.match(this.search);
      });
    }
  }
};

var MealsShowPage = {
  template: "#meals-show-page",
  data: function() {
    return {
      meal: {}
    };
  },
  created: function() {
    axios.get("api/meals/" + this.$route.params.id).then(
      function(response) {
        this.meal = response.data;
        console.log(this.meal);
      }.bind(this)
    );
  },
  methods: {
    DeleteMeal: function() {
      axios.delete("api/meals/" + this.$route.params.id).then(
        function(response) {
          this.meal = response.data;
          console.log(this.meal);
          router.push("/meals");
        }.bind(this)
      );
    }
  },
  computed: {}
};

var NewMeal = {
  template: "#meals-new-page",
  data: function() {
    return {
      name: "",
      meal_category: "",
      calories: "",
      protein: "",
      fat: "",
      carbs: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        meal_category: this.meal_category,
        calories: this.calories,
        protein: this.protein,
        fat: this.fat,
        carbs: this.carbs
      };
      axios
        .post("/api/meals", params)
        .then(function(response) {
          router.push("/meals");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var CaloriesBurned = {
  template: "#calories-burned-calculator-page",
  data: function() {
    return {};
  }
};

var DailyCalories = {
  template: "#daily-calorie-calculator-page",
  data: function() {
    return {};
  }
};

var HeartRate = {
  template: "#calories-burned-heart-rate-page",
  data: function() {
    return {};
  }
};

var BmiCalculator = {
  template: "#bmi-calculator-page",
  data: function() {
    return {};
  }
};

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/signup", component: SignupPage },
    { path: "/profile/", component: UsersShowPage },
    { path: "/profile/:id/edit", component: ProfileEditPage },
    { path: "/profile/:id/delete", component: DeleteProfile },
    { path: "/meals", component: MealIndex },
    { path: "/meals/create", component: NewMeal },
    { path: "/meals/:id", component: MealsShowPage },
    { path: "/calories-burned-calculator", component: CaloriesBurned },
    { path: "/daily-calorie-calculator", component: DailyCalories },
    { path: "/calories-burned-heart-rate", component: HeartRate },
    { path: "/bmi-calculator", component: BmiCalculator }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

const app = Vue.createApp({ 
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  },
  methods: {
    isLoggedIn: function() {
      if(localStorage.getItem("jwt")) {
        return true;
      }
      return false;
    }
  }
})
  app.use(router)
  app.mount('#app')



