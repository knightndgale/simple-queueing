import { ConfigProvider } from "antd";
import { colorPalette } from "./color-palette";
import { sfPro } from "./font";
import { dimension } from "./dimension";

export const DesignToken: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: colorPalette.layout.headerBg,
            headerPadding: "15px",
            headerHeight: 100,
            siderBg: colorPalette.layout.siderBg,
            bodyBg: colorPalette.layout.headerBg,
          },

          Button: {
            colorPrimary: colorPalette.button.main,
            colorPrimaryHover: colorPalette.button.hover,
            colorPrimaryActive: colorPalette.button.main,
            colorLink: colorPalette.link.main,
            defaultColor: colorPalette.button.main,
            defaultHoverBorderColor: colorPalette.button.main,
            defaultHoverColor: colorPalette.button.main,
            defaultActiveColor: colorPalette.button.hover,
            defaultActiveBorderColor: colorPalette.button.hover,
          },
          Typography: {
            colorLink: colorPalette.link.main,
            colorLinkHover: colorPalette.link.hover,
            colorLinkActive: colorPalette.link.main,
          },
          Badge: {
            textFontSizeSM: sfPro.fontSizeNumber[0],
          },
          Steps: {
            colorPrimary: colorPalette.steps.main,
          },
          Pagination: {
            colorPrimary: colorPalette.pagination.main,
            colorPrimaryHover: colorPalette.pagination.hover,
          },
          Menu: {
            darkItemSelectedBg: colorPalette.menu.main,
            darkItemBg: colorPalette.menu.item_bg,
            darkSubMenuItemBg: colorPalette.menu.sub_item_bg,
            darkPopupBg: colorPalette.menu.sub_item_bg,
          },
          Input: {
            hoverBorderColor: colorPalette.input.main,
            activeBorderColor: colorPalette.input.main,
            colorBgContainer: colorPalette.input.transparent,
          },
          Select: {
            colorPrimary: colorPalette.select.main,
            colorPrimaryHover: colorPalette.select.hover,
            optionSelectedBg: colorPalette.select.select_item_bg,
            optionSelectedColor: colorPalette.select.main,
            selectorBg: colorPalette.select.transparent,
          },
          Checkbox: {
            colorPrimary: colorPalette.checkbox.main,
            colorPrimaryHover: colorPalette.checkbox.hover,
          },
          Upload: {
            controlHeightLG: 57,
          },
        },
      }}>
      {children}
    </ConfigProvider>
  );
};
