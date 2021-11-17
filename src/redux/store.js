import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { breedReducer } from "./reducers/breeds.reducer";
import { colorReducer } from "./reducers/colors.reducer";
import { customerReducer } from "./reducers/customer.reducer";
import { dewormingTypeReducer } from "./reducers/deworming-type.reducer";
import { doctorReducer } from "./reducers/doctor.reducer";
import { employeeReducer } from "./reducers/employee.reducer";
import { patTypeReducer } from "./reducers/pat-type.reducer";
import { patientReducer } from "./reducers/patient.reducer";
import { quoteReducer } from "./reducers/quotes.reducer";
import { rolReducer } from "./reducers/role.reducer";
import { serviceTypeReducer } from "./reducers/service-type.reducer";
import { sexReducer } from "./reducers/sexes.reducer";
import { shiftReducer } from "./reducers/shifts.reducer";
import { speciallyReducer } from "./reducers/specially.reducer";
import { speciesReducer } from "./reducers/species.reducer";
import { vaccinationTypeReducer } from "./reducers/vaccination-type.reducer";
import { pestControlTypeReducer } from "./reducers/pest-control-type.reducer";
import { vaccinationDoseReducer } from "./reducers/vaccination-dose.reducer";
import { clinicalServiceReducer } from "./reducers/clinical-service.reducer";
import { quoteTypeReducer } from "./reducers/quote-types.reducer";
import { userReducer } from "./reducers/employe.reducer";
import { vendorReducer } from "./reducers/vendors.reducer";
import { brandReducer } from "./reducers/brand.reducer";
import { categoryReducer } from "./reducers/category.reducer";
import { productReducer } from "./reducers/product.reducer";
import { cartReducer } from "./reducers/cart.reducer";
import { shoppingReducer } from "./reducers/shopping.reducer";
import { salesReducer } from "./reducers/sales-history.reducer";
import { salesDetailReducer } from "./reducers/sale-details.reducer";
import { hospitalServiceReducer } from "./reducers/hospital-services.reducer";
import { resultReducer } from "./reducers/result.reducer";
import { orderServiceReducer } from "./reducers/order-service.reducer";
import { orderServiceDetailReducer } from "./reducers/order-service-details-reducer";
import { estethicServiceReducer } from "./reducers/aestethic.reducer";
import { estethicServiceOrderReducer } from "./reducers/esthetic-service-order";
import { estheticDetailReducer } from "./reducers/esthetic-details.reducer";

const reducers = combineReducers({
  breed: breedReducer,
  specie: speciesReducer,
  color: colorReducer,
  sex: sexReducer,
  patType: patTypeReducer,
  customer: customerReducer,
  patient: patientReducer,
  serviceType: serviceTypeReducer,
  role: rolReducer,
  shift: shiftReducer,
  employee: employeeReducer,
  user: userReducer,
  specially: speciallyReducer,
  doctor: doctorReducer,
  quote: quoteReducer,
  auth: authReducer,
  vaccinationType: vaccinationTypeReducer,
  dewormingType: dewormingTypeReducer,
  pestControlType: pestControlTypeReducer,
  vaccinationDose: vaccinationDoseReducer,
  clinicalService: clinicalServiceReducer,
  quoteType: quoteTypeReducer,
  vendor: vendorReducer,
  brand: brandReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  shopping:shoppingReducer,
  sale:salesReducer,
  saleDetail:salesDetailReducer,
  hospitalService:hospitalServiceReducer,
  result:resultReducer,
  orderService:orderServiceReducer,
  orderDetail:orderServiceDetailReducer,
  estethicService:estethicServiceReducer,
  estheticOrder:estethicServiceOrderReducer,
  estheticDetail:estheticDetailReducer
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
