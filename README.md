# react-router-modal-gallery

This is a simple package for the react-router to implement url based modals. It is mainly based on the Modal Gallery example on [React Training/React Router](https://reacttraining.com/react-router/web/example/modal-gallery) with a little bit of enhancing and some reusable components like ModalRoute, ModalLink and ModalSwitch.

Besides all of the implementation is made by using JavaScript, the components that you can use has TypeScript definitions in index.d.ts file. Thus, you can use them in your TypeScript projects.

**Live demo on Netlify is [here](https://react-router-modal-gallery.netlify.com).**

You may use this package if you want to render modals like **Twitter**, **Facebook** or **Pinterest** style.
It will handle the history and location by default and you can use any modal component from your favorite UI library (material-ui, ant-design etc.)! You can find an example for material-ui at `./demo` folder. Also, there is a more complete application that uses this package [here](https://github.com/onderonur/movies-app-graphql).

## Installation

To install:

`npm install --save react-router-modal-gallery`

This assumes you are using npm as your package manager.

## Basic Usage

The most basic usage may be like this:

```javascript
//...
import { ModalSwitch, ModalRoute } from "react-router-modal-gallery";

//...
<ModalSwitch
  renderModal={({ open, redirectToBack }) => (
    <MuiModal open={open} scroll="body" onExited={redirectToBack}>
      <ModalRoute
        defaultParentPath="/movies"
        path="/movies/:id"
        component={Movie}
      />
      <ModalRoute
        defaultParentPath="/directors"
        path="/directors/:id"
        component={Director}
      />
    </MuiModal>
  )}
>
  <Route exact path="/movies" component={Movies} />
  <Route exact path="/directors" component={Directors} />
  <Route path="/movies/:id" component={Movie} />
  <Route path="/directors/:id" component={Director} />

  {/* If you want to redirect on 404 not found */}
  <Route path="*" render={() => <Redirect to="/movies" />} />
</ModalSwitch>;
//...
//...
```

_Note: MuiModal is just a custom material-ui modal that used for this example. You can use any modal you want. This package doesn't provide any modal component. You can render the modal the way you want inside the `renderModal` prop, by using render prop pattern._

If the user opens `/movies/1` directly, no modal will be opened. A page will be shown. But if you define a ModalLink and route to `/movies/1`, it will open inside the modal that you have defined inside ModalSwitch's `renderModal` prop.
Basically, a normal page will be rendered on initial render. But when you redirect to a movie from another route by using ModalLink, it will be rendered inside a modal and the page that you opened the modal will stay behind the it.

When the modal is closed, you will be redirected to the parent path that you opened the modal. `redirectToBack` function doesn't use `history.push` if you don't open the modal on initial render. It basically goes back to the last route that isn't a modal route.

You don't need to set your modal component at the root level like this example. You can use `useModalGallery` hook and use the context at any child component inside the `ModalSwitch`.

```javascript
function EditMovieModal() {
    const {redirectToBack, isModal, previousParentLocation} = useModalGallery();
    
    //..
    
    return (
        <Modal open={isModal} onClose={redirectToBack}>
            {/* ... */}
        </Modal>
    )
}
```

## ModalLink

When you want to redirect a user to a route which has a modal, you may use the `ModalLink` component.
For example:

```javascript
//...
import { ModalLink } from "react-router-modal-gallery";

    //...
    <ModalLink to=`/movies/${movie.id}`>{movie.name}</ModalLink>
    //...
//...
```

When you click this link, it will attach the required `modal:true` state to `to` prop. Thus, ModalSwitch and ModalRoute will automatically handle the modal.

## Rendering Modals on Initial Render

If you want to open modals on the initial render like Twitter does, you should insert ModalRoute components to children of ModalSwitch. For example;

```javascript
//...
import { ModalSwitch, ModalRoute } from "react-router-modal-gallery";

//...
<ModalSwitch
  renderModal={({ open, redirectToBack }) => (
    <MuiModal open={open} scroll="body" onExited={redirectToBack}>
      <ModalRoute
        defaultParentPath="/movies"
        path="/movies/:id"
        component={Movie}
      />
      <ModalRoute
        defaultParentPath="/directors"
        path="/directors/:id"
        component={Director}
      />
    </MuiModal>
  )}
>
  <Route exact path="/movies" component={Movies} />
  <Route exact path="/directors" component={Directors} />
  <ModalRoute
    defaultParentPath="/movies"
    path="/movies/:id"
    component={Movie}
  />
  <ModalRoute
    defaultParentPath="/directors"
    path="/directors/:id"
    component={Director}
  />

  {/* If you want to redirect on 404 not found */}
  <Route path="*" render={() => <Redirect to="/movies" />} />
</ModalSwitch>;
//...
//...
```

With this way, if a user enter a modal url directly like `.../movies/1`, a modal will be rendered directly and the path you defined at `defaultParentPath` will be rendered in the background.
When the user closes the modal, it will redirect you to the path that you defined at `defaultParentPath` prop.

## Advanced Example

Actually, this has nothing advanced but it looks a little more decent. You may use a structure like [route-config](https://reacttraining.com/react-router/web/example/route-config) and remove the duplication of `ModalRoute` component in both `modalRoutes` prop and `ModalSwitch` children.

```javascript
//...
import { ModalSwitch, ModalRoute } from "../../src";

const routes = [
  {
    exact: true,
    path: "/movies",
    component: Movies
  },
  {
    defaultParentPath: "/movies",
    modal: true,
    path: "/movies/:id",
    component: Movie
  },
  {
    exact: true,
    path: "/directors",
    component: Directors
  },
  {
    defaultParentPath: "/directors",
    modal: true,
    path: "/directors/:id",
    component: Director
  },
  {
    path: "*",
    render: () => <Redirect to="/movies" />
  }
];

const modalRoutes = routes
  .filter(route => route.modal)
  .map(route => <ModalRoute key={route.path} {...route} />);

const Routes = () => (
  <ModalSwitch
    renderModal={({ open, redirectToBack }) => (
      <MuiModal open={open} scroll="body" onExited={redirectToBack}>
        {modalRoutes}
      </MuiModal>
    )}
  >
    {routes.map(route =>
      route.modal ? (
        <ModalRoute key={route.path} {...route} />
      ) : (
        <Route key={route.path} {...route} />
      )
    )}
  </ModalSwitch>
);

export default Routes;
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
