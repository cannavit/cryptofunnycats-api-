// // // NPM library.
// // // https://www.npmjs.com/package/abstract-syntax-tree#nodes

// // import { afterAll } from "@jest/globals";

// // const { parse, find } = require("abstract-syntax-tree");
// // // const source = "answer: 23";
// // const source = "apiVersion: q";

// // const tree = parse(source);
// // console.log(find(tree, "Literal"));

let templateYaml =
  'apiVersion: template.openshift.io/v1\nkind: Template\nlabels:\n  jws31: "1.4"\n  template: jws31-tomcat7-mysql-s2i\nmessage: A new JWS application for Apache Tomcat 7 (using MySQL) has been created\n  in your project. The username/password for administering your JWS is ${JWS_ADMIN_USERNAME}/${JWS_ADMIN_PASSWORD}.\n  For accessing the MySQL database "${DB_DATABASE}" use the credentials ${DB_USERNAME}/${DB_PASSWORD}.\n  Please be sure to create the secret named "${JWS_HTTPS_SECRET}" containing the ${JWS_HTTPS_CERTIFICATE}\n  file used for serving secure content.\nmetadata:\n  annotations:\n    description: Application template for JWS MySQL applications built using S2I.\n    iconClass: icon-rh-tomcat\n    openshift.io/display-name: JBoss Web Server 3.1 Apache Tomcat 7 + MySQL (Ephemeral\n      with https)\n    openshift.io/provider-display-name: Red Hat, Inc.\n    samples.operator.openshift.io/version: 4.7.13\n    tags: tomcat,tomcat7,java,jboss,hidden\n    version: "1.4"\n  creationTimestamp: 2021-06-10T06:34:33Z\n  labels:\n    samples.operator.openshift.io/managed: "true"\n  managedFields:\n  - apiVersion: template.openshift.io/v1\n    fieldsType: FieldsV1\n    fieldsV1:\n      f:labels:\n        .: {}\n        f:jws31: {}\n        f:template: {}\n      f:message: {}\n      f:metadata:\n        f:annotations:\n          .: {}\n          f:description: {}\n          f:iconClass: {}\n          f:openshift.io/display-name: {}\n          f:openshift.io/provider-display-name: {}\n          f:samples.operator.openshift.io/version: {}\n          f:tags: {}\n          f:version: {}\n        f:labels:\n          .: {}\n          f:samples.operator.openshift.io/managed: {}\n      f:objects: {}\n      f:parameters: {}\n    manager: cluster-samples-operator\n    operation: Update\n    time: 2021-06-10T06:34:33Z\n  name: jws31-tomcat7-mysql-s2i\n  namespace: openshift\n  resourceVersion: "12592"\n  uid: 204f0a8a-f701-4174-b40f-e112ac8aacbd\nobjects:\n- apiVersion: v1\n  kind: Service\n  metadata:\n    annotations:\n      description: The web server\'s http port.\n      service.alpha.openshift.io/dependencies: \'[{"name": "${APPLICATION_NAME}-mysql",\n        "kind": "Service"}]\'\n    labels:\n      application: ${APPLICATION_NAME}\n    name: ${APPLICATION_NAME}\n  spec:\n    ports:\n    - port: 8080\n      targetPort: 8080\n    selector:\n      deploymentConfig: ${APPLICATION_NAME}\n- apiVersion: v1\n  kind: Service\n  metadata:\n    annotations:\n      description: The web server\'s https port.\n      service.alpha.openshift.io/dependencies: \'[{"name": "${APPLICATION_NAME}-mysql",\n        "kind": "Service"}]\'\n    labels:\n      application: ${APPLICATION_NAME}\n    name: secure-${APPLICATION_NAME}\n  spec:\n    ports:\n    - port: 8443\n      targetPort: 8443\n    selector:\n      deploymentConfig: ${APPLICATION_NAME}\n- apiVersion: v1\n  kind: Service\n  metadata:\n    annotations:\n      description: The database server\'s port.\n    labels:\n      application: ${APPLICATION_NAME}\n    name: ${APPLICATION_NAME}-mysql\n  spec:\n    ports:\n    - port: 3306\n      targetPort: 3306\n    selector:\n      deploymentConfig: ${APPLICATION_NAME}-mysql\n- apiVersion: v1\n  id: ${APPLICATION_NAME}-http\n  kind: Route\n  metadata:\n    annotations:\n      description: Route for application\'s http service.\n    labels:\n      application: ${APPLICATION_NAME}\n    name: ${APPLICATION_NAME}\n  spec:\n    host: ${HOSTNAME_HTTP}\n    to:\n      name: ${APPLICATION_NAME}\n- apiVersion: v1\n  id: ${APPLICATION_NAME}-https\n  kind: Route\n  metadata:\n    annotations:\n      description: Route for application\'s https service.\n    labels:\n      application: ${APPLICATION_NAME}\n    name: secure-${APPLICATION_NAME}\n  spec:\n    host: ${HOSTNAME_HTTPS}\n    tls:\n      termination: passthrough\n    to:\n      name: secure-${APPLICATION_NAME}\n- apiVersion: v1\n  kind: ImageStream\n  metadata:\n    labels:\n      application: ${APPLICATION_NAME}\n    name: ${APPLICATION_NAME}\n- apiVersion: v1\n  kind: BuildConfig\n  metadata:\n    labels:\n      application: ${APPLICATION_NAME}\n    name: ${APPLICATION_NAME}\n  spec:\n    output:\n      to:\n        kind: ImageStreamTag\n        name: ${APPLICATION_NAME}:latest\n    source:\n      contextDir: ${CONTEXT_DIR}\n      git:\n        ref: ${SOURCE_REPOSITORY_REF}\n        uri: ${SOURCE_REPOSITORY_URL}\n      type: Git\n    strategy:\n      sourceStrategy:\n        env:\n        - name: MAVEN_MIRROR_URL\n          value: ${MAVEN_MIRROR_URL}\n        - name: ARTIFACT_DIR\n          value: ${ARTIFACT_DIR}\n        forcePull: true\n        from:\n          kind: ImageStreamTag\n          name: jboss-webserver31-tomcat7-openshift:1.4\n          namespace: ${IMAGE_STREAM_NAMESPACE}\n      type: Source\n    triggers:\n    - github:\n        secret: ${GITHUB_WEBHOOK_SECRET}\n      type: GitHub\n    - generic:\n        secret: ${GENERIC_WEBHOOK_SECRET}\n      type: Generic\n    - imageChange: {}\n      type: ImageChange\n    - type: ConfigChange\n- apiVersion: v1\n  kind: DeploymentConfig\n  metadata:\n    labels:\n      application: ${APPLICATION_NAME}\n    name: ${APPLICATION_NAME}\n  spec:\n    replicas: 1\n    selector:\n      deploymentConfig: ${APPLICATION_NAME}\n    strategy:\n      type: Recreate\n    template:\n      metadata:\n        labels:\n          application: ${APPLICATION_NAME}\n          deploymentConfig: ${APPLICATION_NAME}\n        name: ${APPLICATION_NAME}\n      spec:\n        containers:\n        - env:\n          - name: DB_SERVICE_PREFIX_MAPPING\n            value: ${APPLICATION_NAME}-mysql=DB\n          - name: DB_JNDI\n            value: ${DB_JNDI}\n          - name: DB_USERNAME\n            value: ${DB_USERNAME}\n          - name: DB_PASSWORD\n            value: ${DB_PASSWORD}\n          - name: DB_DATABASE\n            value: ${DB_DATABASE}\n          - name: DB_MIN_POOL_SIZE\n            value: ${DB_MIN_POOL_SIZE}\n          - name: DB_MAX_POOL_SIZE\n            value: ${DB_MAX_POOL_SIZE}\n          - name: DB_TX_ISOLATION\n            value: ${DB_TX_ISOLATION}\n          - name: JWS_HTTPS_CERTIFICATE_DIR\n            value: /etc/jws-secret-volume\n          - name: JWS_HTTPS_CERTIFICATE\n            value: ${JWS_HTTPS_CERTIFICATE}\n          - name: JWS_HTTPS_CERTIFICATE_KEY\n            value: ${JWS_HTTPS_CERTIFICATE_KEY}\n          - name: JWS_HTTPS_CERTIFICATE_PASSWORD\n            value: ${JWS_HTTPS_CERTIFICATE_PASSWORD}\n          - name: JWS_ADMIN_USERNAME\n            value: ${JWS_ADMIN_USERNAME}\n          - name: JWS_ADMIN_PASSWORD\n            value: ${JWS_ADMIN_PASSWORD}\n          image: ${APPLICATION_NAME}\n          imagePullPolicy: Always\n          name: ${APPLICATION_NAME}\n          ports:\n          - containerPort: 8778\n            name: jolokia\n            protocol: TCP\n          - containerPort: 8080\n            name: http\n            protocol: TCP\n          - containerPort: 8443\n            name: https\n            protocol: TCP\n          readinessProbe:\n            exec:\n              command:\n              - /bin/bash\n              - -c\n              - curl --noproxy \'*\' -s -u ${JWS_ADMIN_USERNAME}:${JWS_ADMIN_PASSWORD}\n                \'http://localhost:8080/manager/jmxproxy/?get=Catalina%3Atype%3DServer&att=stateName\'\n                |grep -iq \'stateName *= *STARTED\'\n          volumeMounts:\n          - mountPath: /etc/jws-secret-volume\n            name: jws-certificate-volume\n            readOnly: true\n        terminationGracePeriodSeconds: 60\n        volumes:\n        - name: jws-certificate-volume\n          secret:\n            secretName: ${JWS_HTTPS_SECRET}\n    triggers:\n    - imageChangeParams:\n        automatic: true\n        containerNames:\n        - ${APPLICATION_NAME}\n        from:\n          kind: ImageStreamTag\n          name: ${APPLICATION_NAME}:latest\n      type: ImageChange\n    - type: ConfigChange\n- apiVersion: v1\n  kind: DeploymentConfig\n  metadata:\n    labels:\n      application: ${APPLICATION_NAME}\n    name: ${APPLICATION_NAME}-mysql\n  spec:\n    replicas: 1\n    selector:\n      deploymentConfig: ${APPLICATION_NAME}-mysql\n    strategy:\n      type: Recreate\n    template:\n      metadata:\n        labels:\n          application: ${APPLICATION_NAME}\n          deploymentConfig: ${APPLICATION_NAME}-mysql\n        name: ${APPLICATION_NAME}-mysql\n      spec:\n        containers:\n        - env:\n          - name: MYSQL_USER\n            value: ${DB_USERNAME}\n          - name: MYSQL_PASSWORD\n            value: ${DB_PASSWORD}\n          - name: MYSQL_DATABASE\n            value: ${DB_DATABASE}\n          - name: MYSQL_LOWER_CASE_TABLE_NAMES\n            value: ${MYSQL_LOWER_CASE_TABLE_NAMES}\n          - name: MYSQL_MAX_CONNECTIONS\n            value: ${MYSQL_MAX_CONNECTIONS}\n          - name: MYSQL_FT_MIN_WORD_LEN\n            value: ${MYSQL_FT_MIN_WORD_LEN}\n          - name: MYSQL_FT_MAX_WORD_LEN\n            value: ${MYSQL_FT_MAX_WORD_LEN}\n          - name: MYSQL_AIO\n            value: ${MYSQL_AIO}\n          image: mysql\n          livenessProbe:\n            initialDelaySeconds: 30\n            tcpSocket:\n              port: 3306\n            timeoutSeconds: 1\n          name: ${APPLICATION_NAME}-mysql\n          ports:\n          - containerPort: 3306\n            protocol: TCP\n          readinessProbe:\n            exec:\n              command:\n              - /bin/sh\n              - -i\n              - -c\n              - MYSQL_PWD="$MYSQL_PASSWORD" mysql -h 127.0.0.1 -u $MYSQL_USER -D $MYSQL_DATABASE\n                -e \'SELECT 1\'\n            initialDelaySeconds: 5\n            timeoutSeconds: 1\n          volumeMounts:\n          - mountPath: /var/lib/mysql/data\n            name: ${APPLICATION_NAME}-data\n        terminationGracePeriodSeconds: 60\n        volumes:\n        - emptyDir:\n            medium: ""\n          name: ${APPLICATION_NAME}-data\n    triggers:\n    - imageChangeParams:\n        automatic: true\n        containerNames:\n        - ${APPLICATION_NAME}-mysql\n        from:\n          kind: ImageStreamTag\n          name: mysql:${MYSQL_IMAGE_STREAM_TAG}\n          namespace: ${IMAGE_STREAM_NAMESPACE}\n      type: ImageChange\n    - type: ConfigChange\nparameters:\n- description: The name for the application.\n  displayName: Application Name\n  name: APPLICATION_NAME\n  required: true\n  value: jws-app\n- description: \'Custom hostname for http service route.  Leave blank for default hostname,\n    e.g.: <application-name>-<project>.<default-domain-suffix>\'\n  displayName: Custom http Route Hostname\n  name: HOSTNAME_HTTP\n- description: \'Custom hostname for https service route.  Leave blank for default\n    hostname, e.g.: secure-<application-name>-<project>.<default-domain-suffix>\'\n  displayName: Custom https Route Hostname\n  name: HOSTNAME_HTTPS\n- description: Git source URI for application\n  displayName: Git Repository URL\n  name: SOURCE_REPOSITORY_URL\n  required: true\n  value: https://github.com/jboss-openshift/openshift-quickstarts\n- description: Git branch/tag reference\n  displayName: Git Reference\n  name: SOURCE_REPOSITORY_REF\n  value: "1.2"\n- description: Path within Git project to build; empty for root project directory.\n  displayName: Context Directory\n  name: CONTEXT_DIR\n  value: todolist/todolist-jdbc\n- description: Database JNDI name used by application to resolve the datasource, e.g.\n    jboss/datasources/mysqlDS\n  displayName: Database JNDI Name\n  name: DB_JNDI\n  value: jboss/datasources/defaultDS\n- description: Database name\n  displayName: Database Name\n  name: DB_DATABASE\n  required: true\n  value: root\n- description: The name of the secret containing the certificate files\n  displayName: Secret Name\n  name: JWS_HTTPS_SECRET\n  required: true\n  value: jws-app-secret\n- description: The name of the certificate file within the secret\n  displayName: Certificate Name\n  name: JWS_HTTPS_CERTIFICATE\n  value: server.crt\n- description: The name of the certificate key file within the secret\n  displayName: Certificate Key Name\n  name: JWS_HTTPS_CERTIFICATE_KEY\n  value: server.key\n- description: The certificate password\n  displayName: Certificate Password\n  name: JWS_HTTPS_CERTIFICATE_PASSWORD\n- description: Sets xa-pool/min-pool-size for the configured datasource.\n  displayName: Datasource Minimum Pool Size\n  name: DB_MIN_POOL_SIZE\n- description: Sets xa-pool/max-pool-size for the configured datasource.\n  displayName: Datasource Maximum Pool Size\n  name: DB_MAX_POOL_SIZE\n- description: Sets transaction-isolation for the configured datasource.\n  displayName: Datasource Transaction Isolation\n  name: DB_TX_ISOLATION\n- description: Sets how the table names are stored and compared.\n  displayName: MySQL Lower Case Table Names\n  name: MYSQL_LOWER_CASE_TABLE_NAMES\n- description: The maximum permitted number of simultaneous client connections.\n  displayName: MySQL Maximum number of connections\n  name: MYSQL_MAX_CONNECTIONS\n- description: The minimum length of the word to be included in a FULLTEXT index.\n  displayName: MySQL FullText Minimum Word Length\n  name: MYSQL_FT_MIN_WORD_LEN\n- description: The maximum length of the word to be included in a FULLTEXT index.\n  displayName: MySQL FullText Maximum Word Length\n  name: MYSQL_FT_MAX_WORD_LEN\n- description: Controls the innodb_use_native_aio setting value if the native AIO\n    is broken.\n  displayName: MySQL AIO\n  name: MYSQL_AIO\n- description: Database user name\n  displayName: Database Username\n  from: user[a-zA-Z0-9]{3}\n  generate: expression\n  name: DB_USERNAME\n  required: true\n- description: Database user password\n  displayName: Database Password\n  from: \'[a-zA-Z0-9]{8}\'\n  generate: expression\n  name: DB_PASSWORD\n  required: true\n- description: JWS Admin User\n  displayName: JWS Admin Username\n  from: \'[a-zA-Z0-9]{8}\'\n  generate: expression\n  name: JWS_ADMIN_USERNAME\n  required: true\n- description: JWS Admin Password\n  displayName: JWS Admin Password\n  from: \'[a-zA-Z0-9]{8}\'\n  generate: expression\n  name: JWS_ADMIN_PASSWORD\n  required: true\n- description: GitHub trigger secret\n  displayName: Github Webhook Secret\n  from: \'[a-zA-Z0-9]{8}\'\n  generate: expression\n  name: GITHUB_WEBHOOK_SECRET\n  required: true\n- description: Generic build trigger secret\n  displayName: Generic Webhook Secret\n  from: \'[a-zA-Z0-9]{8}\'\n  generate: expression\n  name: GENERIC_WEBHOOK_SECRET\n  required: true\n- description: Namespace in which the ImageStreams for Red Hat Middleware images are\n    installed. These ImageStreams are normally installed in the openshift namespace.\n    You should only need to modify this if you\'ve installed the ImageStreams in a\n    different namespace/project.\n  displayName: ImageStream Namespace\n  name: IMAGE_STREAM_NAMESPACE\n  required: true\n  value: openshift\n- description: Maven mirror to use for S2I builds\n  displayName: Maven mirror URL\n  name: MAVEN_MIRROR_URL\n- description: List of directories from which archives will be copied into the deployment\n    folder. If unspecified, all archives in /target will be copied.\n  name: ARTIFACT_DIR\n- description: The tag to use for the "mysql" image stream.  Typically, this aligns\n    with the major.minor version of MySQL.\n  displayName: MySQL Image Stream Tag\n  name: MYSQL_IMAGE_STREAM_TAG\n  required: true\n  value: "5.7"\n';

console.log(templateYaml);

// // const { parse, find } = require('abstract-syntax-tree')
// // const source = 'const answer = 42'
// // const tree = parse(source)
// // console.log(find(tree, 'Literal'))

// // const { parse, walk } = require("abstract-syntax-tree");
// // const source = "const answer = 42";
// // const tree = parse(source);
// // walk(tree, (node, parent) => {
// //   console.log(node);
// //   console.log(parent);
// // });

// async function searchInLine(options) {
//   if (options.section.includes(options.searchLabel)) {
//     let data = options.section.split("\n");

//     let labelLine;
//     for (const d of data) {
//       if (d.includes(options.searchLabel)) {
//         labelLine = d;
//       }
//     }

//     options.searchInLine = {};
//     options.searchInLine[options.searchLabel] = labelLine;
//     return options;
//   }

//   return options;
// }

// async function test() {
//   let templateYamlList = templateYaml.split("apiVersion");

//   let options = {};
//   for (const section of templateYamlList) {
//     options.section = section;
//     options.searchLabel = "kind";
//     options = await searchInLine(options);

//     console.log(options.searchInLine);
//   }
// }

// test();

// const { serialize } = require("abstract-syntax-tree");
// const node = {
//   type: "ArrayExpression",
//   elements: [
//     { type: "Literal", value: 1 },
//     { type: "Literal", value: 2 },
//     { type: "Literal", value: 3 },
//     { type: "Literal", value: 4 },
//     { type: "Literal", value: 5 },
//   ],
// };
// const array = serialize(node); // [1, 2, 3, 4, 5]

// import assert from "assert";
// import { namedTypes as n, builders as b } from "ast-types";

// var fooId = b.identifier("foo");
// var ifFoo = b.ifStatement(
//   fooId,
//   b.blockStatement([b.expressionStatement(b.callExpression(fooId, []))])
// );

// assert.ok(n.IfStatement.check(ifFoo));

// https://infosecwriteups.com/javascript-parser-to-create-abstract-syntax-tree-ast-acorn-be9bbfe91bed

// const { Parser } = require("acorn");

// const MyParser = Parser.extend(require("acorn-jsx")(), require("acorn-bigint"));

// let sss = MyParser.parse("y=2,y=3, y=0");
// console.log(sss);

// GOOD TUTORIAL.

// // https://www.digitalocean.com/community/tutorials/js-traversing-ast
// const { Parser } = require("acorn");
// const { readFileSync } = require("fs");
// const recast = require('recast');

// let fileName =
//   "/Users/ceciliocannavaciuolo/Documents/workspace/phd/smoke-collector/src/services/abstractSyntaxTree/example.js";

// const ast = Parser.parse(readFileSync(fileName).toString());

// recast.visit(ast, visitFunctionDeclaration(path){
//   // the navigation code here...

//   // return false to stop at this depth
//   return false;
// })
