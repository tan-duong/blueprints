#Install it on host app
- ignite attach
- ignite add path/to/rn-fb-stripe
- cd ios && pod install

#Uninstall it
- ignite add rn-fb-stripe
- cd ios && pod install

#Usage
https://tipsi.github.io/tipsi-stripe/docs/index.html 

#Troubleshoot
- If you got issue with iOS during compiling the app, please try update podfile and run pod install 

pod 'tipsi-stripe', :path => '../node_modules/tipsi-stripe'
  pod 'yoga', path: '../node_modules/react-native/ReactCommon/yoga/yoga.podspec'
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket',
    'DevSupport'
  ]
  

