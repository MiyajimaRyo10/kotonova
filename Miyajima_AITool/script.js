document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const titleScreen = document.getElementById("title-screen");
    const characterSelectScreen = document.getElementById("character-select-screen");
    const gameScreen = document.getElementById("game-screen");
    const resultScreen = document.getElementById("result-screen");
    const confirmCharacterButton = document.getElementById("confirm-character");
    const restartButton = document.getElementById("restart-button");
    const wordInput = document.getElementById("word-input");
    const submitWord = document.getElementById("submit-word");
    const specialAttack = document.getElementById("special-attack");
    const player1Health = document.getElementById("player1-health");
    const player2Health = document.getElementById("player2-health");
    const winnerText = document.getElementById("winner-text");

    let player1HP = 100;
    let player2HP = 100;
    let turn = 1;
    let lastWord = "";
    let attackPoints = 0;
    let selectedCharacter = null;

    console.log("スクリプトが正しく読み込まれました");



    // ✅ ゲームスタートボタンを押したらキャラクター選択画面に遷移
    startButton.addEventListener("click", () => {
        console.log("ゲームスタートボタンが押されました！");
        titleScreen.classList.remove("active");
        titleScreen.classList.add("hidden");

        characterSelectScreen.classList.remove("hidden");
        characterSelectScreen.classList.add("active");
    });

    // ✅ キャラクター選択の処理
    const characterOptions = document.querySelectorAll(".character-option");
    characterOptions.forEach(option => {
        option.addEventListener("click", () => {
            // 選択状態をリセット
            characterOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");

            // 選択されたキャラを保存
            selectedCharacter = option.querySelector(".character-img").dataset.character;
            console.log(`選択されたキャラクター: ${selectedCharacter}`);
        });
    });

    // ✅ キャラクター決定ボタン
    confirmCharacterButton.addEventListener("click", () => {
        if (!selectedCharacter) {
            alert("キャラクターを選んでください！");
            return;
        }

        console.log(`キャラクター決定: ${selectedCharacter}`);

        // キャラクター選択画面を非表示
        characterSelectScreen.classList.remove("active");
        characterSelectScreen.classList.add("hidden");

        // ゲーム画面を表示
        gameScreen.classList.remove("hidden");
        gameScreen.classList.add("active");
    });

    // ✅ しりとりバトルの処理
    submitWord.addEventListener("click", () => {
        const word = wordInput.value.trim();
        if (word === "" || (lastWord && lastWord.slice(-1) !== word[0])) {
            alert("無効な単語です！");
            return;
        }
        lastWord = word;
        attackPoints++;

        if (attackPoints >= 3) {
            specialAttack.classList.remove("hidden");
        }

        if (turn === 1) {
            player2HP -= 10;
            player2Health.textContent = `P2 HP: ${player2HP}`;
            turn = 2;
        } else {
            player1HP -= 10;
            player1Health.textContent = `P1 HP: ${player1HP}`;
            turn = 1;
        }

        wordInput.value = "";
        checkGameOver();
    });

    // ✅ 必殺技発動
    specialAttack.addEventListener("click", () => {
        if (turn === 1) {
            player2HP -= 30;
            player2Health.textContent = `P2 HP: ${player2HP}`;
        } else {
            player1HP -= 30;
            player1Health.textContent = `P1 HP: ${player1HP}`;
        }
        attackPoints = 0;
        specialAttack.classList.add("hidden");
        checkGameOver();
    });

    // ✅ ゲーム終了判定
    function checkGameOver() {
        if (player1HP <= 0 || player2HP <= 0) {
            gameScreen.classList.remove("active");
            gameScreen.classList.add("hidden");
            resultScreen.classList.remove("hidden");
            resultScreen.classList.add("active");

            winnerText.textContent =
                player1HP <= 0 ? "プレイヤー2の勝ち！" : "プレイヤー1の勝ち！";
        }
    }

    // ✅ 再スタート
    restartButton.addEventListener("click", () => {
        player1HP = 100;
        player2HP = 100;
        attackPoints = 0;
        lastWord = "";
        turn = 1;
        selectedCharacter = null;

        player1Health.textContent = "P1 HP: 100";
        player2Health.textContent = "P2 HP: 100";
        specialAttack.classList.add("hidden");

        resultScreen.classList.remove("active");
        resultScreen.classList.add("hidden");
        characterSelectScreen.classList.remove("hidden");
        characterSelectScreen.classList.add("active");
    });
});