import {
  UICompBuilder,
  NameConfig,
  NumberControl,
  Section,
  withDefault,
  withExposingConfigs,
  withMethodExposing,
  eventHandlerControl,
  styleControl,
  toJSONObjectArray,
  jsonControl,
  AutoHeightControl,
  EditorContext,
  stringExposingStateControl,
} from "lowcoder-sdk";
import { useResizeDetector } from "react-resize-detector";

import styles from "./styles.module.css";

import { Turnstile } from '@marsidev/react-turnstile';



const childrenMap = {
  CFToken: stringExposingStateControl(),
  clientKey: stringExposingStateControl("text", "3x00000000000000000000FF"),
};


const turnstileCompBase = new UICompBuilder(childrenMap, (props: any) => {
  function setToken(token: string) {
    props.CFToken.onChange(token);
}

  return (
    <div className={styles.wrapper}>
      
      <Turnstile siteKey={props.clientKey.value} onSuccess={setToken}/>
    </div>
  );
})
  .setPropertyViewFn((children: any) => {
    return (
      <>
        <Section name="Basic">
          
          {children.clientKey.propertyView({ label: "clientKey" })}
        </Section>
        
      </>
    );
  })
  .build();

const cfTurnstile = withMethodExposing(turnstileCompBase, [

]);

export default withExposingConfigs(cfTurnstile, [
  new NameConfig("CFToken", ""),
  new NameConfig("clientKey", ""),
]);
