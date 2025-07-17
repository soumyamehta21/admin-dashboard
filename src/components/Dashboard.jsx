const isActive = (path) => {
  if (path === "/projects") {
    return (
      location.pathname === "/projects" ||
      location.pathname === "/projects/add" ||
      location.pathname.startsWith("/projects/")
    );
  }
  return location.pathname === path;
};
