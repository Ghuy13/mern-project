import { message as messageApi } from "antd";

const success = (mes = "Success") => {
    messageApi.open({
        type: "success",
        content: mes,
    });
};

const error = (mes = "Error") => {
    messageApi.open({
        type: "error",
        content: mes,
    });
};

const warning = (mes = "Warning") => {
    messageApi.open({
        type: "warning",
        content: mes,
    });
};

export { success, error, warning };
