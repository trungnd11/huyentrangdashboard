import Alert from "../../components/alert/Alert";
import { AlertType } from "../../enum/Enum";
import { ServiceModel } from "../../model/ServiceModel";

export const validationForm = (
  service: ServiceModel | undefined,
  image?: File | string | undefined
): boolean => {
  if (service) {
    !service.serviceType
      ? Alert(AlertType.ERROR, "Vui lòng chọn loại dịch vụ")
      : !image
      ? Alert(AlertType.ERROR, "Vui lòng chọn ảnh dịch vụ")
      : !service.name && Alert(AlertType.ERROR, "Vui lòng nhập tên dịch vụ");
    if (service.serviceType && service.name && image) return true;
    return false;
  }
  Alert(AlertType.ERROR, "Vui lòng nhập đầy đủ thông tin");
  return false;
};
