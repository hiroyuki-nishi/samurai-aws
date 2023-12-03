import { Grid, IconButton } from "@material-ui/core";
import CodeIcon from '@material-ui/icons/Code';
import { useState } from "react";

import { MaterialButton } from "../common/button/MaterialButton";
import { FullScreanDialog } from "../common/dialog/FullScreanDialog";
import { MaterialInput } from "../common/input/MaterialInput";
import { Item, MaterialSelect } from "../common/input/MaterialSelect";
import { MaterialSnackbar } from "../common/snackbar/MaterialSnackbar";
import { GenericTemplate } from "../common/template/GenerateTemplate";
import { DeviceCard } from "./DeviceCard";
import { MaterialGrid } from "./DeviceGrid";
import { DeviceModel } from "./DeviceModel";


export const Device = () => {
  const originDevices = [...Array(50)].map((_, i) =>
    new DeviceModel("ITEM " + i.toString(), i % 2 === 0 ? "IOS" : "Android"))
  const [showCards, setShowCards] = useState(true);
  const [open, setOpenDialog] = useState(false);
  const [rental, setRental] = useState(false);
  // TODO: 
  const [device, setDevice] = useState(new DeviceModel("", ""));
  const [devices, setDevices] = useState(originDevices);

  const SELECT_ITEMS = [
    new Item("IOS", "IOS"), // TODO: enumにする
    new Item("Android", "Android")
  ]
  const FORM_KEYS = {
    NAME: 'name',
  }

  const onOpenDialog = (device: DeviceModel) => {
    setDevice(device)
    setOpenDialog(true)
  }
  const onCloseDialog = () => setOpenDialog(false)
  const onRental= () => {
    console.info("レンタル！")
    setRental(true);
  }
  const onSelectHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value)
    setDevices(originDevices.filter(x => x.os === event.target.value))
  }

  // TODO
  const formChange = (formName: string) => {
    switch (formName) {
      case FORM_KEYS.NAME:
        console.log("NAME")
        break;
      default:
        console.log('key not found');
    }
  };
  const createCards = (devices: DeviceModel[]) => {
    return devices.map(device =>
      <Grid item xs={4}>
        <DeviceCard device={device} onMediaClick={(device: DeviceModel) => onOpenDialog(device)} />
      </Grid>
    )
  }

  return (
    <>
    <GenericTemplate
      subHeaderLeft={
        <MaterialSelect
          items={SELECT_ITEMS}
          handleChange={onSelectHandleChange}
        />
      }
      subHeader={
        <>
          {/* TODO: 部品化する */}
          <IconButton color="inherit" onClick={() => setShowCards(!showCards)}>
            <CodeIcon />
          </IconButton>
        </>
      }>
      {showCards ? createCards(devices) : <MaterialGrid onRowClick={() => onOpenDialog(new DeviceModel("", ""))}/>}
      <FullScreanDialog
        content={
          <MaterialInput
            formName={FORM_KEYS.NAME}
            fullWidth={true}
            inputProps={{ maxLength: 18 }}
            label="名前"
            variant="standard"
            changeValue={formChange}
          />
        }
        actions={
          <MaterialButton text="レンタル" color="primary" fullWidth={true} variant="contained" onClick={onRental} />
        }
        open={open}
        title={device.title}
        close={onCloseDialog} />
    </GenericTemplate>
    {/* TODO: 一番上に持っていく */}
    <MaterialSnackbar message="レンタルしました。" open={rental} handleClose={() => setRental(false)}/>
    </>
  );
};
