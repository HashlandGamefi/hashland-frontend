# hashland

# 更新 sdk

    rm -rf package-lock.json
    npm i

# 发布测试包

    test-hashland
    dev     分支
    git pull
    npm run build:dev

# 发布正式包

    hashland-frontend
    main    分支
    git pull
    tar zcvf prod.时间戳.tar.gz prod
    npm run publish

# 悔棋

    rm -rf prod
