import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "../firebase";
import store from "../store";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import DefaultUser from "../views/Dashboard/User";
import DetailContent from "../views/DetailContent";
import Writer from "../views/Dashboard/Writer";
import AddContent from "../views/AddContent";
import EditContent from "../views/EditContent";
import Nutritionist from "../views/Dashboard/Nutritionist";
import ProofreadingContent from "../views/ProofreadingContent";
import Admin from "../views/Dashboard/Admin";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Victu"
    }
  },
  {
    path: "/user",
    name: "Dashboard User",
    component: DefaultUser,
    meta: {
      requiresLogin: true,
      allowedRole: "user",
      title: "Dashboard"
    }
  },
  {
    path: "/content/:id",
    name: "Detail Content",
    component: DetailContent,
    meta: {
      requiresLogin: true,
      allowedRole: "user+writer+nutritionist+admin",
      title: "Content"
    }
  },
  {
    path: "/nutritionist",
    name: "Dashboard Nutritionist",
    component: Nutritionist,
    meta: {
      requiresLogin: true,
      allowedRole: "nutritionist",
      title: "Dashboard"
    }
  },
  {
    path: "/proofreading",
    name: "Proofreading",
    component: ProofreadingContent,
    meta: {
      requiresLogin: true,
      allowedRole: "nutritionist+admin",
      title: "Proofreading"
    }
  },
  {
    path: "/writer",
    name: "Dashboard Writer",
    component: Writer,
    meta: {
      requiresLogin: true,
      allowedRole: "writer",
      title: "Dashboard"
    }
  },
  {
    path: "/add-content",
    name: "Add Content",
    component: AddContent,
    meta: {
      requiresLogin: true,
      allowedRole: "writer",
      title: "Add New Content"
    }
  },
  {
    path: "/edit-content/:id",
    name: "Edit Content",
    component: EditContent,
    meta: {
      requiresLogin: true,
      allowedRole: "writer",
      title: "Add New Content"
    }
  },
  {
    path: "/admin",
    name: "Dashboard Admin",
    component: Admin,
    meta: {
      requiresLogin: true,
      allowedRole: "admin",
      title: "Dashboard"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    }
  },
  {
    path: "*",
    name: "Unavailable"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth.currentUser;
  let requiresLogin = to.matched.some(x => x.meta.requiresLogin);
  if (to.name == "Unavailable") {
    next("/" + store.state.userProfile.role);
  } else {
    if (currentUser) {
      if (requiresLogin) {
        if (to.meta.allowedRole.includes(store.state.userProfile.role)) {
          next();
        } else {
          next("/" + store.state.userProfile.role); //To user dashboard
        }
      } else {
        if (to.name == "Register" || to.name == "Login") {
          next("/" + store.state.userProfile.role); //To user dashboard
        } else {
          next();
        }
      }
    } else {
      if (requiresLogin) {
        next("/login");
      } else {
        next();
      }
    }
  }
});

export default router;
