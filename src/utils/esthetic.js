export function setItemEsthetic(service) {
    if (getEsthetic()) {
      const cartsItems = getEsthetic();
      if (service) {
        const filtered = cartsItems.filter((a) => a.id === service.id);
        if (filtered.length === 1) {
          sumItemService(service);
          return;
        }
        const newItem = cartsItems.concat(service);
        localStorage.setItem("esthetic", JSON.stringify(newItem));
        return { newItem };
      }
      return;
    }
    localStorage.setItem("esthetic", JSON.stringify([service]));
  }
  
  export function getEsthetic() {
    return JSON.parse(localStorage.getItem("esthetic") || "[]");
  }
  
  export function removeEstheticItem(item, option) {
    if (item) {
      if (getEsthetic()) {
        const cartsItems = getEsthetic();
        const fnd = cartsItems.find((a) => a.id === item.id);
        const index = cartsItems.indexOf(fnd);
        if (option === "remove" || cartsItems[index].qt <= 1) {
          cartsItems.splice(index, 1);
        } else if (cartsItems[index].qt > 1) {
          cartsItems[index].price =
            cartsItems[index].price -
            cartsItems[index].price / cartsItems[index].qt;
          cartsItems[index].qt--;
        }
        localStorage.setItem("esthetic", JSON.stringify(cartsItems));
      }
    }
  }
  
  export function sumItemService(product) {
    const cartsItems = getEsthetic();
    const fnd = cartsItems.find((a) => a.id === product.id);
    const index = cartsItems.indexOf(fnd);
    cartsItems[index].qt++;
    cartsItems[index].total_price =
      cartsItems[index].qt * cartsItems[index].price;
    localStorage.setItem("esthetic", JSON.stringify(cartsItems));
  }
  export function clearEsthetic() {
    localStorage.removeItem("esthetic");
  }
  