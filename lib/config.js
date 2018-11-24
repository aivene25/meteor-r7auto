AdminConfig = {
  name: "R7Auto Admin",
  adminEmails: ["eneroakerele@gmail.com", "olamideodusola@gmail.com"],
  nonAdminRedirectRoute: "/register",
  collections: {
    Posts: {
      tableColumns: [
        { label: "Title", name: "title" },
        { label: "Content", name: "content" }
      ]
    },
    Services: {
      tableColumns: [
        { label: "Service", name: "service" },
        { label: "ShortDescription", name: "short_description" },
        { label: "Icon", name: "icon" },
        { label: "Price", name: "price" }
      ]
    },
    Cars: {
      tableColumns: [
        { label: "Make", name: "make" },
        { label: "Model", name: "model" },
        { label: "Description", name: "description" },
        { label: "Price", name: "price" },
        { label: "Year", name: "year" },
        { label: "Visible", name: "show" }
      ]
    },
    SpareParts: {
      tableColumns: [
        { label: "Title", name: "title" },
        { label: "Description", name: "description" },
        { label: "Category", name: "category" },
        { label: "Price", name: "price" }
      ]
    },
    CarServicing: {
      tableColumns: [
        { label: "title", name: "title" },
      ]
    }
  }
};
