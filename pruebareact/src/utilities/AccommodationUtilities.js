export const getWifiForDisplay = (wifi) => {
    switch (wifi) {
        case 0:
            return "No";
        case 1:
            return "Si";
    }
}